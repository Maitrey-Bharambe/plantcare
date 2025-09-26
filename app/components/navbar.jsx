"use client"

import React from 'react';
import { motion } from 'framer-motion';
import SplitText from "./SplitText";
import { useRouter } from 'next/navigation';




const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};


export default function Navbar(initialDelay=2000) {

  const router = useRouter();
  return (
    <nav
  className="navbar max-h-[80px] flex justify-center items-center text-[#3E3A39] text-[30px] font-bold fixed top-0 left-0 w-full z-50 p-4 backdrop-blur-[4px] bg-[#F8D4C8]/40"
>
  <div className="flex justify-between items-center w-full max-w-7xl px-4">
    <motion.div className="flex-1 text-left"
      onClick={() => router.push('/reminder')}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut", delay: 2 }}
    >
      Reminder
    </motion.div>

    <div className="flex-1 flex justify-center"
    onClick={() => router.push('/')}>
      <SplitText
        text="PlantCare"
        className="text-[50px] text-[#3E3A39] font-bold"
        delay={75}
        initialDelay={2000}
        duration={0.5}
        ease={[0.42, 0, 1, 1]}
        splitType="chars"
        from={{ opacity: 1, y: 80 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        onLetterAnimationComplete={handleAnimationComplete}
        textAlign="center"
      />
    </div>

    <motion.h1
    onClick={() => router.push('/chatbot')}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 2 }}
      className="flex-1 flex justify-end text-[30px] text-[#3E3A39] font-bold"
    >
      Chatbot
    </motion.h1>
  </div>
</nav>

  );
}
