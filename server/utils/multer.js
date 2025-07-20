import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 7 * 1024 * 1024 } // 20 MB
});

export default upload;