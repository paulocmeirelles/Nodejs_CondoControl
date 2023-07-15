import { PDFExtract } from "pdf.js-extract";
import PDFDocument from "pdfkit";
import fs from "fs";
import boletoRepository from "../repositories/boleto.repository.js";
import pdfTableHelper from "./pdfTable.helper.js";

async function convertToBase64(data) {
  await pdfTableHelper.createPDFTable(data);
  // const pdfBase64 = await readLocalPDF();
  // console.log(pdfBase64);
  // return pdfBase64;
}

async function readLocalPDF() {
  fs.readFile("./report.pdf", (err, pdfBuffer) => {
    if (err) {
      console.log(err);
    } else {
      pdfBuffer.toString("base64");
      return pdfBuffer;
    }
  });
}

async function uploadPDF(buffer) {
  const pages = await bufferPDFToData(buffer);
  let arrayPages = arrayBasedOnPDFPages(pages);
  //This is the sequence, but I think it's better to get this from the bank
  const arraySorting = ["Jose da Silva", "Marcos Roberto", "Marcia Carvalho"];
  const result = orderArrayBased(arrayPages, arraySorting);
  for (let lote of result) {
    const boleto = await boletoRepository.getBoletosByLote(
      lote[4].split(": ")[1]
    );
    lote.push(boleto.id);
  }
  result.forEach((row) => {
    arrayToPDF(row, row[5]);
  });
}

function arrayToPDF(array, index) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`./tmp/pdf/${index}.pdf`));
  doc.fontSize(25);
  doc.font("Times-Roman");
  array.pop();
  array.forEach((value) => {
    doc.text(value, { align: "left" });
    doc.moveDown();
  });
  doc.end();
}

async function bufferPDFToData(buffer) {
  const pdfExtract = new PDFExtract();
  let pages;
  await pdfExtract
    .extractBuffer(buffer)
    .then((data) => (pages = data.pages))
    .catch((err) => console.log(err));
  return pages;
}

function arrayBasedOnPDFPages(pages) {
  let pageNumber = 0;
  let arrayText = [];
  let arrayRows = [];
  pages.forEach((value) => {
    value.content.forEach((row) => {
      row.str == "" ? row.str : arrayRows.push(row.str);
    });
    arrayText.push(arrayRows);
    pageNumber++;
    arrayRows = [];
  });
  return arrayText;
}

function arrayToJson(array) {
  let arrayBase = [];
  let json = {};
  array.forEach((value) => {
    json.header = value[0];
    json.name = value[1].split(": ")[1];
    json.value = value[2];
    json.billet = value[3];
    arrayBase.push(json);
    json = [];
  });
  return arrayBase;
}

function orderArrayBased(arrayToOrder, arrayToBased) {
  let result = [];
  arrayToBased.forEach((value) => {
    arrayToOrder.forEach((row) => {
      if (row[1].split(": ")[1].toUpperCase() == value.toUpperCase()) {
        result.push(row);
      }
    });
  });
  return result;
}

export default {
  bufferPDFToData,
  orderArrayBased,
  arrayBasedOnPDFPages,
  arrayToJson,
  arrayToPDF,
  uploadPDF,
  convertToBase64,
};
