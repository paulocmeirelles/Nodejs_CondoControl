import loteRepository from "../repositories/lote.repository.js";
import boletoRepository from "../repositories/boleto.repository.js";

async function createLote(data) {
  const lote = await loteRepository.getLoteByNome(data.nome);
  if (lote.length > 0) {
    return { status: 422, message: "Lote já existe" };
  } else {
    return await loteRepository.createLote(data);
  }
}

async function createBoletos(json) {
  return await boletoRepository.createBoletos(json);
}

export default {
  createLote,
  createBoletos,
};
