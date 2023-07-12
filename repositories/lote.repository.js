import Lote from "../models/lotes.model.js";

async function createLote(data) {
  try {
    return await Lote.create(data);
  } catch (err) {
    throw err;
  }
}

async function getLotes() {
  try {
    return await Lote.findAll();
  } catch (err) {
    throw err;
  }
}

async function getLote(id) {
  try {
    return await Lote.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function deleteLote(id) {
  try {
    await Lote.destroy({
      where: {
        id: id,
      },
    });
    return `Lote ${id} foi deletado`;
  } catch (err) {
    throw err;
  }
}

async function updateLote(data) {
  try {
    await Lote.update(
      {
        nome: data.nome,
        ativo: data.ativo,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
    return await getLote(data.id);
  } catch (err) {
    throw err;
  }
}

export default {
  createLote,
  getLote,
  getLotes,
  deleteLote,
  updateLote,
};
