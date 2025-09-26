'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import SplitText from "./SplitText";
import Navbar from './navbar';
import Router from 'next/navigation';


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function Hero({ title, description, imageUrl }) {
  return (
    <div className="hero bg-[#F8D4C8] overflow-y-scroll p-8 min-h-screen flex justify-center items-center relative text-center">
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
        initial={{ opacity: 1, y: 1000 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 1.5, ease: [0.3, 0, 0, 1], delay:0.7 }}
        className="z-10 rounded-[25px] min-h-[85vh] bg-[#2D411B] overflow-hidden shadow-lg w-full flex flex-col md:flex-row items-center p-6 md:p-12"
      >
        <div className="text-left text-[#FBF7F5] md:w-1/2 w-full mb-6 md:mb-0">
        <h1 className='text-[40px] font-bold'>Heading</h1>
        <p className='text-[20px]'>Description goes here.</p>
        </div>

      </motion.div>
    </div>
  );
}


