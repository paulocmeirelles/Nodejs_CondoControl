import express from "express";
const router = express.Router();

import boletoController from "../controllers/boleto.controller.js";

router.post("/", boletoController.createBoleto);
router.get("/", boletoController.getBoletos);
router.get("/:id", boletoController.getBoleto);
router.delete("/:id", boletoController.deleteBoleto);
router.put("/", boletoController.updateBoleto);

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
