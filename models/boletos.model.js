import Sequelize from "sequelize";
import Lote from "../models/lotes.model.js";
import pg from "../repositories/connectPG.js";

const Boleto = pg.define(
  "boleto",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome_sacado: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    valor: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    },
    linha_digitavel: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ativo: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    criado_em: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false }
);

Boleto.belongsTo(Lote, { foreignKey: "id" });

export default Boleto;
