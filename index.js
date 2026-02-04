import http from "http";
import { WebSocketServer } from "ws";
import WebSocket from "ws";

const TARGET = "wss://cef6f81c-4bab-439a-92f5-f0687bdf4581-00-2aeib0prr98uc.kirk.replit.dev";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (client) => {
  const target = new WebSocket(TARGET);

  target.on("open", () => {
    client.on("message", (msg) => target.send(msg));
    target.on("message", (msg) => client.send(msg));
  });

  target.on("close", () => client.close());
  client.on("close", () => target.close());
});

server.listen(process.env.PORT || 8080, () => {
  console.log("WebSocket reverse proxy running");
});
