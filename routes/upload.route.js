import express from "express";
import uploadController from "../controllers/upload.controller.js";
import multer from "multer";

const router = express.Router();

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post("/", upload.single("file"), uploadController.uploadFile);

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
