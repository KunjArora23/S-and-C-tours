import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 8 * 1024 * 1024 } // 20 MB
});

export default upload;