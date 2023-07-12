import boletoService from "../services/boleto.service.js";

async function createBoleto(req, res, next) {
  try {
    const data = req.body;
    if (!data.nome || !data.id_lote) {
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
    res.send(await boletoService.getBoletos());
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
    if (!data.nome || !data.boletoId) {
      return res.status(422).json({
        message: "nome e boleto_id são obrigatórios",
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
