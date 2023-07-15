function csvUpload(csv) {
  let rows = csvToArray(csv);
  const json = arrayToJSON(rows);
  return json;
}

function csvToArray(csv) {
  //csv em buffer
  const rawRows = csv.toString().split("\n");
  let rows = [];
  for (let i of rawRows) {
    rows.push(i.replace("\r", "").split(","));
  }
  rows.shift();
  // rows = addLoteToArray(rows, id_lote);
  return rows;
}

function addLoteToArray(array, id_lote) {
  for (let i in array) {
    array[i].push(id_lote);
  }
  return array;
}

function arrayToJSON(array) {
  let json = {};
  let arrayJSON = [];
  for (let row of array) {
    json.nome_sacado = row[0];
    json.valor = row[2];
    json.linha_digitavel = row[3];
    json.unidade = row[1];
    arrayJSON.push(json);
    json = {};
  }
  return arrayJSON;
}

export default {
  csvToArray,
  addLoteToArray,
  arrayToJSON,
  csvUpload,
};
