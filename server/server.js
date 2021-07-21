import express from "express";
import rootRouter from "./routers/rootRouter.js";
import cors from "cors";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is Listening localhost:${PORT}🚀`);
});
