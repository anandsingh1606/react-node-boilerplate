import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { log } from "Utils/common.util";
import { initSocket } from "Utils/socket";
import routes from "./routes";
import dataSanitizer from "Middleware/data-sanitizer";
import addLocale from "Middleware/locale";
import cors from "cors";
import db from "Db";

const app = express();
const server = http.Server(app);
const port = process.env.PORT;

initSocket(server);

// ANCHOR start server listen
server.listen(port, () => {
  log("test server is running...");
  log(`Port: ${port}`);
});

// CORS handling
app.use(cors());

// ANCHOR Handle multi language
app.use(addLocale);

// ANCHOR init database
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// ANCHOR apply middleware
app.use(bodyParser.json());

// ANCHOR all api routes
app.use("/api", dataSanitizer, routes);

console.log("process.env.SMS_ACCOUNT_SID", process.env.SMS_ACCOUNT_SID);
