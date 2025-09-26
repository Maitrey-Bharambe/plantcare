'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import SplitText from "../components/SplitText";


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function Home() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: 'Thanks for your message! I am here to assist you.'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="chatbot bg-[#F8D4C8] overflow-y-scroll p-8 min-h-screen flex justify-center items-center relative text-center">
      <Navbar />

      <div className="absolute inset-0 flex jusify-center items-center z-0 pointer-events-none">
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
        initial={{  y: 1000 }}
        animate={{  y: 20 }}
        transition={{ duration: 1.5, ease: [0.3, 0, 0, 1], delay:0.7 }}
        className="flex flex-col flex-grow rounded-[25px] bg-[#2D411B] p-6 md:p-12 shadow-lg overflow-hidden min-h-[85vh] mx-auto"
      >
        <h1 className="text-[40px] font-bold text-[#FBF7F5] mb-6 text-center">Chatbot</h1>
        <div className="flex flex-col flex-grow overflow-y-auto mb-6 space-y-4">
          {messages.map(({ id, sender, text }) => (
            <div
              key={id}
              className={`max-w-[70%] p-4 rounded-lg ${
                sender === 'user' ? 'bg-[#F8D4C8] text-[#2D411B] self-end' : 'bg-[#4A6B2F] text-[#FBF7F5] self-start'
              }`}
            >
              {text}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-grow rounded-lg p-3 text-[#2D411B]"
          />
          <button
            onClick={handleSend}
            className="bg-[#F8D4C8] text-[#2D411B] rounded-lg px-6 font-semibold hover:bg-[#e6b9a7] transition"
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
}
