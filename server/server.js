import express from "express";
import rootRouter from "./routers/rootRouter.js";
import orderRouter from "./routers/orderRouter.js";
import cartRouter from "./routers/cartRouter.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routers/userRouter.js";
import adminRouter from "./routers/adminRouter.js";

const app = express();
// const PORT = process.env.PORT || 5000;
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
// app.use("/admin", express.static("uploads"), adminRouter);
app.listen(PORT, () => {
  console.log(`Server is Listening localhost:${PORT}🚀`);
});
