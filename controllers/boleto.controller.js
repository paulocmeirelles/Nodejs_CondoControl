import boletoService from "../services/boleto.service.js";
import pdfHelper from "../helpers/pdf.helper.js";
import fs from "fs";

async function createBoleto(req, res, next) {
  try {
    const data = req.body;
    if (!data.nome_sacado || !data.id_lote) {
      return res
        .status(422)
        .json({ message: "nome e id_lote são obrigatório" });
    }
    res.send(await boletoService.createBoleto(data));
  } catch (err) {
    next(err);
  }
}

async function getBoletos(req, res, next) {
  try {
    if (req.url.includes("?") && !req.url.includes("relatorio")) {
      res.send(await boletoService.getBoletosFiltered(req.query));
    } else if (req.url.includes("relatorio")) {
      const data = await boletoService.getBoletosReport(req.query);
      await pdfHelper.convertToBase64(data);
      fs.readFile("./report.pdf", (err, pdfBuffer) => {
        if (err) {
          console.log(err);
        } else {
          res.send({ base64: pdfBuffer.toString("base64") });
        }
      });
      // res.send({ base64: base64 });
    } else {
      res.send(await boletoService.getBoletos());
    }
  } catch (err) {
    next(err);
  }
}

async function getBoleto(req, res, next) {
  try {
    res.send(await boletoService.getBoleto(req.params.id));
  } catch (err) {
    next(err);
  }
}

async function deleteBoleto(req, res, next) {
  try {
    res.send({
      message: await boletoService.deleteBoleto(req.params.id),
    });
  } catch (err) {
    next(err);
  }
}

async function updateBoleto(req, res, next) {
  try {
    const data = req.body;
    if (!data.id) {
      return res.status(422).json({
        message: "id é obrigatórios",
      });
    }
    res.send(await boletoService.updateBoleto(data));
  } catch (err) {
    next(err);
  }
}

export default {
  createBoleto,
  getBoleto,
  getBoletos,
  deleteBoleto,
  updateBoleto,
};
