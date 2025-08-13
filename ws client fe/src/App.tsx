import { useEffect, useRef, useState } from "react";

function App() {
  const [ws, setWs] = useState<WebSocket>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket("ws://localhost:8080");

    // Save socket in state
    setWs(socket);

    // Connection opened
    socket.onopen = () => {
      console.log("✅ Connected to WebSocket server");
    };

    // Listen for messages
    socket.onmessage = (event) => {
      console.log("📥 Received:", event.data);
      alert(event.data); // You can update state instead of using alert if needed
    };

    // Cleanup when component unmounts
    return () => {
      console.log("❌ Closing WebSocket connection");
      socket.close();
    };
  }, []);

  const handleSend = () => {
    const message = inputRef.current?.value.trim();

    // Avoid sending empty messages
    if (!message) return;

    // If current state of the connect is open (readyState === 1) then send message to wss
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(message);
      console.log("📤 Sent:", message);
    } else {
      console.warn("WebSocket is not open");
    }

    // Optional: Clear the input after sending
    inputRef.current!.value = "";
  };

  return (
    <div>
      <h2>WebSocket Client</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter 'ping' to get 'pong'"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
