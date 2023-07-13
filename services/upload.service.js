import loteRepository from "../repositories/lote.repository.js";
import boletoRepository from "../repositories/boleto.repository.js";

async function createLote(data) {
  return await loteRepository.createLote(data);
}

async function createBoletos(json) {
  return await boletoRepository.createBoletos(json);
}

export default {
  createLote,
  createBoletos,
};
