import multer from "multer";
import { CustomError } from "../middlewares/errorHandler";
import path from "path";
import fs from "fs";

// luu tru
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/images");
  },
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10000000 bytes --> 10mb
  fileFilter: (req, file, cb) => {
    const fileType = /jpg|png|PNG|gif|JPG|jpeg/;
    const mimeType = fileType.test(file.mimetype);
    const extname = fileType.test(path.extname(file.originalname));
    if (mimeType && extname) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("avatar");

const deleteImage = (pathImg: any) => {
  if (pathImg !== "" || pathImg != null) {
    fs.unlink(pathImg, (err) => {
      if (err) {
        throw new CustomError(500, "can not delete this image");
      }
    });
  }
};

const uploadService = {
  upload,
  deleteImage,
};
export default uploadService;
