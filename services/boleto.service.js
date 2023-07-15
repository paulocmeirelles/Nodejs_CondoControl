import boletoRepository from "../repositories/boleto.repository.js";
import boletoHelper from "../helpers/boleto.helper.js";

async function createBoleto(data) {
  return await boletoRepository.createBoleto(data);
}

async function getBoletosFiltered(data) {
  data.nome === undefined ? (data.nome = "") : data.nome;
  data = boletoHelper.verifyValorBoleto(data);
  data = boletoHelper.verifyLoteBoleto(data);
  return await boletoRepository.getBoletosFiltered(data);
}

async function getBoletosReport(data) {
  return await boletoRepository.getBoletos();
  // return await boletoRepository.getBoletosByLote(data.relatorio);
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
  getBoletosFiltered,
  getBoletosReport,
};
