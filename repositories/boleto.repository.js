import Boleto from "../models/boletos.model.js";
import Lote from "../models/lotes.model.js";
import { Op } from "sequelize";

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

async function getBoletosFiltered(data) {
  try {
    return await Boleto.findAll({
      where: {
        nome_sacado: { [Op.startsWith]: data.nome },
        valor: { [Op.between]: [data.valor_inicial, data.valor_final] },
        id_lote: { [Op.between]: [data.lote_init, data.lote_end] },
      },
    });
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
    return await Boleto.findOne({
      where: {
        id_lote: id,
      },
      order: [["id", "DESC"]],
    });
  } catch (err) {
    throw err;
  }
}

async function getBoletosByName(name) {
  try {
    return await Boleto.findOne({
      where: {
        nome_sacado: name,
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
  getBoletosFiltered,
  getBoletosByName,
};
