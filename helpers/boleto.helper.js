function verifyValorBoleto(data) {
  if (data.valor === undefined) {
    if (data.valor_inicial === undefined && data.valor_final === undefined) {
      data.valor_inicial = 0;
      data.valor_final = 100000000000000000n;
    } else if (
      data.valor_inicial !== undefined &&
      data.valor_final === undefined
    ) {
      data.valor_final = 100000000000000000n;
    } else if (
      data.valor_inicial === undefined &&
      data.valor_final !== undefined
    ) {
      data.valor_inicial = 0;
    }
  } else {
    if (data.valor_inicial === undefined && data.valor_final === undefined) {
      data.valor_inicial = 0;
      data.valor_final = 100000000000000000n;
    } else if (
      data.valor_inicial !== undefined &&
      data.valor_final === undefined
    ) {
      data.valor_final = 100000000000000000n;
    } else if (
      data.valor_inicial === undefined &&
      data.valor_final !== undefined
    ) {
      data.valor_inicial = 0;
    }
  }
  return data;
}

function verifyLoteBoleto(data) {
  if (data.id_lote === undefined) {
    data.lote_init = 1;
    data.lote_end = 100000000000000000n;
  } else {
    data.lote_init = data.id_lote;
    data.lote_end = data.id_lote;
  }
  return data;
}

export default {
  verifyValorBoleto,
  verifyLoteBoleto,
};
