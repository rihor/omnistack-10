const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

const routes = require("./routes");
const { setupWebsocket } = require("./websocket");

const app = express();
const server = http.Server(app); // servidor http

setupWebsocket(server);

mongoose.connect(
  "mongodb://omnistack:omnistack@cluster0-shard-00-00-idspv.mongodb.net:27017,cluster0-shard-00-01-idspv.mongodb.net:27017,cluster0-shard-00-02-idspv.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
