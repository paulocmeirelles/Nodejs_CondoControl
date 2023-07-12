import express from "express";
const router = express.Router();

import loteController from "../controllers/lote.controller.js";

router.post("/", loteController.createLote);
router.get("/", loteController.getLotes);
router.get("/:id", loteController.getLote);
router.delete("/:id", loteController.deleteLote);
router.put("/", loteController.updateLote);

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
