import { useState } from "react";
import Message from "./Message";
import { sendMessage } from "../services/api";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await sendMessage(input);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error: Cannot connect to backend" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
