import jwt from "jsonwebtoken";
import multer from "multer";
const { verify } = jwt;

//to validate token before responding to request
export const validateToken = (req, res, next) => {
  //one of the way to pass token
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ errorMessage: "로그인하지 않은 사용자입니다" });
  }

  try {
    const validToken = verify(accessToken, "xlSWyC0Jw2");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ errorMessage: err });
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const itemImgUpload = multer({
  dest: "uploads/images",
  limits: { fileSize: 5000000 },
});
