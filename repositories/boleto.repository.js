import Boleto from "../models/boletos.model.js";
import Lote from "../models/lotes.model.js";

async function createBoleto(data) {
  try {
    return await Boleto.create(data);
  } catch (err) {
    throw err;
  }
}

async function createBoletos(json) {
  try {
    return await Boleto.bulkCreate(json);
  } catch (err) {
    throw err;
  }
}

async function getBoletos() {
  try {
    return await Boleto.findAll();
  } catch (err) {
    throw err;
  }
}

async function getBoleto(id) {
  try {
    return await Boleto.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function getBoletosByLote(id) {
  try {
    return await Boleto.findAll({
      where: {
        id_lote: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function deleteBoleto(id) {
  try {
    await Boleto.destroy({
      where: {
        id: id,
      },
    });
    return `Boleto ${id} foi deletado`;
  } catch (err) {
    throw err;
  }
}

async function updateBoleto(data) {
  try {
    await Boleto.update(
      {
        nome_sacado: data.nome,
        id_lote: data.id_lote,
        valor: data.valor,
        linha_digitavel: data.linha_digitavel,
        ativo: data.ativo,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
    return await getBoleto(data.id);
  } catch (err) {
    throw err;
  }
}

export default {
  createBoleto,
  createBoletos,
  getBoleto,
  getBoletos,
  getBoletosByLote,
  deleteBoleto,
  updateBoleto,
};
