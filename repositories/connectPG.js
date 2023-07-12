import * as dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

const pg = new Sequelize(`${process.env.DB_CONNECTION}`, {
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

export default pg;
