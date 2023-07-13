import express from "express";
import bodyParser from "body-parser";

const router = express.Router();

import boletoController from "../controllers/boleto.controller.js";

router.post("/", bodyParser.json(), boletoController.createBoleto);
router.get("/", boletoController.getBoletos);
router.get("/:id", boletoController.getBoleto);
router.delete("/:id", boletoController.deleteBoleto);
router.put("/", bodyParser.json(), boletoController.updateBoleto);

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
