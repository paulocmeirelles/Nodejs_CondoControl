import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc/doc.js";
import * as dotenv from "dotenv";

// Initialing express
const app = express();

// Routes
import BoletosRouter from "./routes/boleto.route.js";
app.use("/boletos", BoletosRouter);
import LotesRouter from "./routes/lote.route.js";
app.use("/lote", LotesRouter);

// Setting environment variables
dotenv.config();

// Setting express
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Setting route to documentation
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Starting API
app.listen(process.env.PORT, () =>
  console.log(`API working on PORT ${process.env.PORT}`)
);
