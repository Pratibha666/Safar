import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, MapPin, User, Bot, Loader2, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm Safar AI. Where are we traveling today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      sender: "user",
      text: message,
      time: timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:8080/api/ai/chat", {
        message,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I'm having trouble connecting",
          time: timestamp,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div
          className="fixed bottom-8 right-8 flex flex-col items-end z-50"
        >
          <div className="bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow mb-3">
            Chat with me!
          </div>

          <div onClick={() => setIsOpen(true)} className="relative w-14 h-14 cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-r from-lime-500 to-green-500 shadow-lg hover:scale-110 transition">
            <Bot size={28} className="text-black" />

            <span className="absolute -top-2 -right-1 text-lg animate-bounce">
              👋
            </span>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50">

          {/* Header */}
          <div className="bg-gradient-to-r from-lime-600 to-lime-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <MapPin className="text-rose-700" size={30} />
              <div>
                <h3 className="font-bold text-black">Safar AI</h3>
                <p className="text-xs opacity-80 text-black">Travel Expert</p>
              </div>
            </div>

            <button className="cursor-pointer text-black" onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-400">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "justify-end" : ""
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="bg-green-500 p-2 rounded-full text-black">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`max-w-[70%] p-3 rounded-xl text-sm ${
                    msg.sender === "user"
                      ? "bg-green-500 text-black"
                      : "bg-gray-300 shadow"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] opacity-60">{msg.time}</span>
                </div>

                {msg.sender === "user" && (
                  <div className="bg-gray-300 p-2 rounded-full">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="bg-green-600 p-2 rounded-full text-black">
                  <Bot size={16} />
                </div>

                <div className="bg-white shadow px-3 py-2 rounded-xl flex items-center gap-2 text-sm">
                  <Loader2 size={14} className="animate-spin" />
                  Safar is thinking...
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="p-3 border-t flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about trip ideas..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-lime-400 cursor-pointer border-black text-black p-2 rounded-full disabled:opacity-60"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;