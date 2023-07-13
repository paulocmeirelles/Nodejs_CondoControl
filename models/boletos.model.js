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
    id_lote: {
      type: Sequelize.INTEGER,
      references: {
        model: Lote,
        key: "id",
      },
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
      defaultValue: true,
    },
    criado_em: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  { underscored: true, timestamps: false }
);

// Boleto.sync({ force: true });

Lote.hasOne(Boleto, { foreignKey: "id_lote", sourceKey: "id" });

export default Boleto;
