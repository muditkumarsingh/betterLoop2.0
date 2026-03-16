import { useState } from "react";
import API from "../services/api";
import "../styles/aiChatWidget.css";

function AIChatWidget() {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
        role: "assistant",
        content: "Hi! I'm here to support you. Tell me what you're feeling."
    }
    ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {

      setLoading(true);

      const res = await API.post("/chat", {
        message: userMessage.content
      });

      const aiMessage = {
        role: "assistant",
        content: res.data.reply
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      console.error("AI chat failed", error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <>
      {/* Floating button */}

      <div className="chat-button">
        <button onClick={() => setOpen(!open)}>💬</button>
      </div>

      {/* Chat window */}

      {open && (

        <div className="chat-window">

          <div className="chat-header">
            AI Support
          </div>

          {/* Messages */}

          <div className="chat-messages">

            {messages.map((msg, i) => (

              <div
                key={i}
                className={msg.role === "user" ? "chat-user" : "chat-ai"}
              >
                <span>{msg.content}</span>
              </div>

            ))}

            {loading && <p>AI thinking...</p>}

          </div>

          {/* Input */}

          <div className="chat-input">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type your message..."
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>

      )}

    </>

  );

}

export default AIChatWidget;