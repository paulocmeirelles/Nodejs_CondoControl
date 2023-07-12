import loteService from "../services/lote.service.js";

async function createLote(req, res, next) {
  try {
    const data = req.body;
    if (!data.nome) {
      return res.status(422).json({ message: "nome é obrigatório" });
    }
    res.send(await loteService.createLote(data));
  } catch (err) {
    next(err);
  }
}

async function getLotes(req, res, next) {
  try {
    res.send(await loteService.getLotes());
  } catch (err) {
    next(err);
  }
}

async function getLote(req, res, next) {
  try {
    res.send(await loteService.getLote(req.params.id));
  } catch (err) {
    next(err);
  }
}

async function deleteLote(req, res, next) {
  try {
    res.send({
      message: await loteService.deleteLote(req.params.id),
    });
  } catch (err) {
    next(err);
  }
}

async function updateLote(req, res, next) {
  try {
    const data = req.body;
    if (!data.nome || !data.id) {
      return res.status(422).json({
        message: "nome e lote_id são obrigatórios",
      });
    }
    res.send(await loteService.updateLote(data));
  } catch (err) {
    next(err);
  }
}

export default {
  createLote,
  getLote,
  getLotes,
  deleteLote,
  updateLote,
};
