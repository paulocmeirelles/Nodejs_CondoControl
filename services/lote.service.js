import loteRepository from "../repositories/lote.repository.js";
import boletoRepository from "../repositories/boleto.repository.js";

async function createLote(data) {
  const lote = await getLoteByName(data.nome);
  if (lote.length > 0) {
    return { status: 422, message: "Lote já existe" };
  } else {
    return await loteRepository.createLote(data);
  }
}

async function getLotes() {
  return await loteRepository.getLotes();
}

async function getLote(id) {
  return await loteRepository.getLote(id);
}

async function getLoteByName(nome) {
  return await loteRepository.getLoteByName(nome);
}

async function deleteLote(id) {
  const boletos = await boletoRepository.getBoletosByLote(id);
  if (boletos.length > 0) {
    return { status: 422, message: "Lote possui boletos" };
  } else {
    return await loteRepository.deleteLote(id);
  }
}

async function updateLote(data) {
  return await loteRepository.updateLote(data);
}

export default {
  createLote,
  getLotes,
  getLote,
  deleteLote,
  updateLote,
  getLoteByName,
};
