import express, { Express, Request, Response } from 'express';
import morgan from "morgan";
import dotenv from 'dotenv';
import helmet from "helmet";
import path from 'path';
import { json, urlencoded } from "body-parser";
import cors from "cors"

const app: Express = express();

/** 
 * set basic express settings
 */
dotenv.config({ path: "./.env" });

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(json({ limit: "5mb" }));
app.use(urlencoded({ limit: "5mb", extended: true }));
app.use(cors());

/** Routes */
app.use('/', express.static(path.join(__dirname, "..", "views")));

// app.use("/api/users", require("./routes/api/users"));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'views/index.html')));

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});