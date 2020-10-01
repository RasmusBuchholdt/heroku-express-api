let cors = require("cors");
let express = require("express");
let bodyparser = require("body-parser");
let HTTP = require("http-status-codes");
let compression = require('compression')

let config = require("../config/app.json");
let app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(compression())
app.use(cors());

app.use((req: any, resp: any, next: any) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "X-Requested-With");
  resp.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
  resp.setHeader('content-type', 'application/json; charset=utf-8');
  next();
});

app.set("port", (process.env.PORT || config.app_port));

app.get("/api/", (req: any, resp: any) => {
  return resp.status(HTTP.OK).json("Hello, World!");
});

app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});