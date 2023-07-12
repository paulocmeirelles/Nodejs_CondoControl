import boletoRepository from "../repositories/boleto.repository.js";

async function createBoleto(data) {
  return await boletoRepository.createBoleto(data);
}

async function getBoletos() {
  return await boletoRepository.getBoletos();
}

async function getBoleto(id) {
  return await boletoRepository.getBoleto(id);
}

async function deleteBoleto(id) {
  return await boletoRepository.deleteBoleto(id);
}

async function updateBoleto(data) {
  return await boletoRepository.updateBoleto(data);
}

export default {
  createBoleto,
  getBoletos,
  getBoleto,
  deleteBoleto,
  updateBoleto,
};
