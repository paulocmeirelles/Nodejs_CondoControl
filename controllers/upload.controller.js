import uploadService from "../services/upload.service.js";
import uploadHelper from "../helpers/upload.helper.js";

async function uploadLote(req, res, next) {
  if (req.file.mimetype != "text/csv") {
    return res.status(422).json({
      message: "Formato do documento é diferente de text/csv",
    });
  }
  let csv = req.file["buffer"];
  // let rows = uploadHelper.csvToArray(csv);
  try {
    const json_lote = await uploadService.createLote({
      nome: req.file.originalname,
    });
    let rows = uploadHelper.csvToArray(csv, json_lote.id);
    const json = uploadHelper.arrayToJSON(rows);
    await uploadService.createBoletos(json);
    res.send(csv.toString());
  } catch (err) {
    next(err);
  }
}

export default {
  uploadLote,
};
