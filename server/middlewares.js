import jwt from "jsonwebtoken";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
const { verify } = jwt;
// const s3 = new aws.S3({
//   credentials: {
//     accessKeyId: "AKIAXZOZB6O2GK5WXRW5",
//     secretAccessKey: "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",
//   },
// });
const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isHeroku = process.env.NODE_ENV === "production";

const s3ItemUploader = multerS3({
  s3: s3,
  bucket: "tennis365",
  acl: "public-read",
});

//to validate token before responding to request
export const validateToken = (req, res, next) => {
  //one of the way to pass token
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ errorMessage: "로그인하지 않은 사용자입니다" });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
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
  dest: "uploads",
  limits: { fileSize: 5000000 },
  storage: s3ItemUploader,
  // storage: isHeroku ? s3ItemUploader : undefined,
});

// export const itemImgUpload = multer({
//   dest: "uploads",
//   limits: { fileSize: 5000000 },
// });
