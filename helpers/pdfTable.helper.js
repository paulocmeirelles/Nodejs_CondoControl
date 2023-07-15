import PDFDocument from "pdfkit-table";
import fs from "fs";

async function createPDFTable(data) {
  let rows = createDatatoTable(data);
  let doc = new PDFDocument({ margin: 30, size: "A4" });
  doc.pipe(fs.createWriteStream("./report.pdf"));
  const table = {
    title: "Report",
    headers: [
      { label: "id", property: "id", width: 20, renderer: null },
      {
        label: "nome_sacado",
        property: "nome_sacado",
        width: 100,
        renderer: null,
      },
      { label: "id_lote", property: "id_lote", width: 30, renderer: null },
      { label: "valor", property: "valor", width: 60, renderer: null },
      {
        label: "linha_digitavel",
        property: "linha_digitavel",
        width: 120,
        renderer: null,
      },
      { label: "ativo", property: "ativo", width: 30, renderer: null },
      {
        label: "criado_em",
        property: "criado_em",
        width: 80,
        renderer: null,
      },
    ],
    rows: rows,
  };
  await doc.table(table, { width: 500 });
  doc.end();
}

function createDatatoTable(data) {
  let rows = [];
  data.forEach((value) => {
    rows.push([
      value.dataValues.id,
      value.dataValues.nome_sacado,
      value.dataValues.id_lote,
      value.dataValues.valor,
      value.dataValues.linha_digitavel,
      value.dataValues.ativo,
      value.dataValues.criado_em.toString().split("T")[0],
    ]);
  });
  return rows;
}

export default {
  createPDFTable,
};
