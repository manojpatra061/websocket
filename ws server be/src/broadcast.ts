// Store all active WebSocket connections so we can broadcast messages or manage connected clients

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });
console.log('wss is running on "ws://localhost:3000"');

const clients = new Set<WebSocket>(); // This stores all connected sockets

wss.on("connection", (socket) => {
  console.log("✅ New client connected");
  clients.add(socket); // Remember this client
  console.log("total number of clients = ", clients.size);

  socket.send("👋 Welcome!");

  // Listen for messages from this client
  socket.on("message", (data) => {
    console.log("📨 Message received:", data.toString());

    // Broadcast this message to all clients (including sender)
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`🔁 Broadcast: ${data}`);
      }
    }
  });

  // Remove the socket when it disconnects
  socket.on("close", () => {
    console.log("❌ Client disconnected");
    clients.delete(socket); // Forget this client
  });
});
