"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import SplitText from "../components/SplitText";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Get user from Supabase Auth
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        router.push("/auth");
      }
    };
    getUser();
  }, [router]);

  // Fetch last 3 messages from Supabase
  useEffect(() => {
    if (!userId) return;
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }) // Most recent first
        .limit(3);

      if (data) {
        // Reverse to show oldest first if you want
        const formatted = data.reverse().map((m) => ({
          id: m.id,
          sender: "bot",
          text: m.response,
        }));
        setMessages(formatted);
      }
    };
    fetchMessages();
  }, [userId]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !userId) return;

    const userMessage = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId }),
      });

      const data = await res.json();
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.response,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <div className="settings-page bg-[#F8D4C8] min-h-screen p-8 flex flex-col justify-center items-center relative text-center">
      <Navbar />

      <div className="absolute inset-0 flex justify-center items-center z-0 pointer-events-none">
        <div className="overflow-hidden max-h-[225px] w-full">
          <SplitText
            text="PlantCare"
            className="text-[200px] text-[#2D411B] font-semibold"
            delay={75}
            duration={0.5}
            ease={[0.42, 0, 1, 1]}
            splitType="chars"
            from={{ opacity: 1, y: 200 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>
      </div>

      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 20 }}
        transition={{ duration: 1.5, ease: [0.3, 0, 0, 1], delay: 0.7 }}
        className="flex items-center justify-center rounded-[25px] bg-[#2D411B] p-6 md:p-12 shadow-lg overflow-hidden h-[85vh] w-full mx-auto"
      >
        <div className="w-fullflex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.1)] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F8D4C8] rounded-full flex items-center justify-center">
                <span className="text-[#2D411B] text-xl">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#FBF7F5]">
                  Plant Care Assistant
                </h1>
                <p className="text-[#FBF7F5] opacity-70 text-sm">
                  Ask me anything about your plants!
                </p>
              </div>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Chat Messages Container */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-[#4A6B2F] scrollbar-track-transparent">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl p-8 max-w-md">
                    <div className="text-6xl mb-4">🌱</div>
                    <h3 className="text-[#FBF7F5] text-xl font-semibold mb-2">
                      Welcome to Plant Care Chat!
                    </h3>
                    <p className="text-[#FBF7F5] opacity-70">
                      Start a conversation by asking about plant care, watering
                      schedules, or plant health issues.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map(({ id, sender, text }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[75%] ${
                        sender === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          sender === "user" ? "bg-[#F8D4C8]" : "bg-[#4A6B2F]"
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            sender === "user"
                              ? "text-[#2D411B]"
                              : "text-[#FBF7F5]"
                          }`}
                        >
                          {sender === "user" ? "👤" : "🤖"}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`p-4 rounded-2xl shadow-lg ${
                          sender === "user"
                            ? "bg-[#F8D4C8] text-[#2D411B] rounded-tr-sm"
                            : "bg-[#4A6B2F] text-[#FBF7F5] rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="border-t border-[rgba(255,255,255,0.1)] p-6">
              <div className="flex items-end gap-4 max-w-4xl mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your plant care question..."
                    className="w-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-2xl p-4 pr-12 text-[#FBF7F5] placeholder:text-[#FBF7F5] placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#F8D4C8] focus:border-transparent resize-none"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FBF7F5] opacity-30">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                </div>

                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#F8D4C8] text-[#2D411B] rounded-2xl px-6 py-4 font-semibold hover:bg-[#e6b9a7] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                >
                  <span>Send</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Typing Indicator */}
              <div className="flex items-center gap-2 mt-3 text-[#FBF7F5] opacity-50 text-sm">
                <div className="w-2 h-2 bg-[#F8D4C8] rounded-full"></div>
                <span>Press Enter to send • Shift+Enter for new line</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
