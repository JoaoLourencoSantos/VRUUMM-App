const rabbiMQ = require("amqplib/callback_api");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const app = express();

const AMQP_URL =
  "amqps://oshgkrzg:UGeGl_ODOBs97UbTqKd00_CfN0oQRUsw@clam.rmq.cloudamqp.com/oshgkrzg";
const AMQP_QUEUE = "test-queue-dev";

app.use(express.static(__dirname + "/dist/Vruumm"));
app.use(cors());

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/Vruumm/index.html"));
});

const server = http.createServer(app);
server.listen(process.env.PORT || 8080, () => {
  console.log(` [*] Application started on port: ${process.env.PORT || 8080}`);
});

const socketIO = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  console.log(" [*] Client connected - " + socket.id);

  socket.on("disconnect", () => console.log(" [*] Client disconnected"));
});

socketIO.on("new-message", (msg) => {
  console.log(msg);
});

rabbiMQ.connect(AMQP_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.assertQueue(AMQP_QUEUE, { durable: true });
    ch.prefetch(1);

    console.log(" [*] Waiting for messages in %s", AMQP_QUEUE);

    ch.consume(AMQP_QUEUE, processMessage, { noAck: true });
  });
});

function processMessage({ content }) {
  console.log(" [*] Processing message from queue ");
  console.log(content.toString());
  socketIO.emit("notify", content.toString());
}
