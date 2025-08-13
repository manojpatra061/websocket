// creating ws server - ping pong

import { WebSocketServer } from "ws";

// Create a new WebSocket server listening on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Listen for new client connections
wss.on("connection", function (ws) {
  console.log("client connected to wss...");

  // Listen for messages from the connected client
  ws.on("message", function (message) {
    // If the message is "ping", respond with "pong"
    if (message.toString() === "ping") {
      ws.send("pong");
      console.log("pong sent...");
    }
  });

  // Listen for client disconnection
  ws.on("close", () => {
    console.log("client disconnected...");
  });
});

console.log('wss is running on "ws://localhost:8080"');
