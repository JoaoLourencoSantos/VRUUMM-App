const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const rabbiMQ = require("amqplib/callback_api");

const AMQP_URL =
  "amqps://oshgkrzg:UGeGl_ODOBs97UbTqKd00_CfN0oQRUsw@clam.rmq.cloudamqp.com/oshgkrzg";
const AMQP_QUEUE = "test-queue-dev";

app.use(express.static(__dirname + "/dist/Vruumm"));
app.use(cors());

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/Vruumm/index.html"));
});

let server = require("http").Server(app);
server = server.listen(process.env.PORT || 8080, () => {
  console.log(`started on port: ${process.env.PORT || 8080}`);
});

const socketIO = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIO.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));

  socketIO.emit("notify", "TESTE");
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
  console.log("AQUI - CONSUME");
  console.log(content.toString());
  socketIO.emit("notify", content.toString());
}
