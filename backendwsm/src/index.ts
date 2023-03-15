import express, { Express } from "express";
import dotenv from "dotenv";
import initWebRoute from "./routers/Router";
import bodyParser from "body-parser";
import logger from "morgan";
import connect from "./database/config/connectDB";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import helmet, { crossOriginOpenerPolicy } from "helmet";
import cookieParser from "cookie-parser";
import { sendMail } from "./services/sendMailServices";
import swaggerdocs from "./swagger";
require("express-async-errors");

dotenv.config();

const app: Express = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use(logger("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

//gui mail
sendMail();
const port = process.env.PORT || 8080;
connect();

//swagger
swaggerdocs(app);

initWebRoute(app);
app.use(errorHandler);
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
// });

export default app;
