import uploadService from "../services/upload.service.js";
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
      const json_lote = await uploadService.createLote({
        nome: req.file.originalname,
      });
      const json = csvHelper.csvUpload(csv, json_lote);
      await uploadService.createBoletos(json);
      res.send(csv.toString());
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
