import Lote from "./models/lotes.model.js";

(async function () {
  try {
    Lote.bulkCreate([
      { nome: "0011" },
      { nome: "0015" },
      { nome: "0017" },
      { nome: "0012" },
      { nome: "0013" },
      { nome: "0018" },
      { nome: "0019" },
      { nome: "0014" },
    ]);
  } catch (err) {
    console.log(err);
  }
});
