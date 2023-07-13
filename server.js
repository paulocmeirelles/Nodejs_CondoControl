import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./doc/doc.js";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

// Initialing express
const app = express();

// Routes
import BoletosRouter from "./routes/boleto.route.js";
app.use("/boletos", BoletosRouter);
import LotesRouter from "./routes/lote.route.js";
app.use("/lote", LotesRouter);
import UploadRouter from "./routes/upload.route.js";
app.use("/upload", UploadRouter);

// Setting environment variables
dotenv.config();

// Setting express
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Setting route to documentation
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Starting API
app.listen(process.env.PORT, () =>
  console.log(`API working on PORT ${process.env.PORT}`)
);
