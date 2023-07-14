import { PDFExtract } from "pdf.js-extract";
import PDFDocument from "pdfkit";
import fs from "fs";

async function uploadPDF(buffer) {
  const pages = await bufferPDFToData(buffer);
  let arrayPages = arrayBasedOnPDFPages(pages);
  const arraySorting = ["Jose da Silva", "Marcos Roberto", "Marcia Carvalho"];
  const result = orderArrayBased(arrayPages, arraySorting);
  result.forEach((row, index) => {
    arrayToPDF(row, index);
  });
}

function arrayToPDF(array, index) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`./tmp/pdf/${index + 1}.pdf`));
  doc.fontSize(30);
  doc.font("Times-Roman");
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
};
