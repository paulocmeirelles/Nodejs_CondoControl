import Sequelize from "sequelize";
import pg from "../repositories/connectPG.js";

const Lote = pg.define(
  "lote",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: true,
      length: 100,
    },
    ativo: {
      type: Sequelize.STRING,
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

// Lote.sync({ force: true });

export default Lote;
