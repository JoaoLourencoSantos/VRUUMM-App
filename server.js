const rabbiMQ = require("amqplib/callback_api");
const { Server } = require("socket.io");
const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const app = express();

const AMQP_URL =
  "amqps://oshgkrzg:UGeGl_ODOBs97UbTqKd00_CfN0oQRUsw@clam.rmq.cloudamqp.com/oshgkrzg";
const AMQP_EXCHANGE = "pending-rents";
const AMQP_QUEUE = "user-rents-queue";

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

socketIO.on("new-message", (msg) => {
  console.log(msg);
});

rabbiMQ.connect(AMQP_URL, function (error, connection) {
  socketIO.on("connection", (socket) => {
    console.log(" [*] Client connected - " + socket.id);

    if (!socket.handshake.auth.token) {
      console.log(" [*] Invalid connection - " + socket.id);
      return;
    }

    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      const key =
        "user-rents-" + socket.handshake.auth.token.toString() + "-key";

      channel.assertExchange(AMQP_EXCHANGE, "topic", {
        durable: false,
      });

      channel.assertQueue(
        AMQP_QUEUE,
        {
          exclusive: true,
        },
        function (error2, config) {
          if (error2) {
            throw error2;
          }

          console.log(" [*] Routing key from user - " + key);

          channel.bindQueue(config.queue, AMQP_EXCHANGE, key);

          channel.consume(
            config.queue,
            (message) => {
              try {
                console.log(
                  " [*] Processing message from exchange - " + AMQP_EXCHANGE
                );
                console.log(
                  " [*] User id to send - " + socket.handshake.auth.token
                );
                socket.emit("notify", message.content.toString());

                channel.ack(message);
              } catch (err) {
                console.log(" [*] Error on processing message from queue ");
              }
            },
            {
              noAck: false,
            }
          );
        }
      );

      socket.on("disconnect", () => {
        console.log(" [*] Client disconnected");
        channel.close();
      });
    });
  });
});
