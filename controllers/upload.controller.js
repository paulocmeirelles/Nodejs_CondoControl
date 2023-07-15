import loteService from "../services/lote.service.js";
import boletoService from "../services/boleto.service.js";
import csvHelper from "../helpers/csv.helper.js";
import pdfHelper from "../helpers/pdf.helper.js";

async function uploadFile(req, res, next) {
  if (req.file.mimetype === "application/pdf") {
    try {
      const buffer = req.file["buffer"];
      await pdfHelper.uploadPDF(buffer);
      res.send("PDFs gerados");
    } catch (err) {
      next(err);
    }
  } else if (req.file.mimetype === "text/csv") {
    try {
      let csv = req.file["buffer"];
      if (csv.length === 0) {
        return res.status(422).json({ message: "csv vazio" });
      }
      const json = csvHelper.csvUpload(csv);
      for (let value of json) {
        const lote = await loteService.getLoteByName(
          value.unidade.padStart(4, "0")
        );
        if (lote.id) {
          value.id_lote = lote.id;
          boletoService.createBoleto(value);
        } else {
          console.log(`${value.unidade} não existe no banco`);
        }
      }
      res.send(json);
    } catch (err) {
      next(err);
    }
  } else {
    return res.status(422).json({
      message:
        "Formato do documento é diferente de text/csv ou application/pdf",
    });
  }
}

export default {
  uploadFile,
};
