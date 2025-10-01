"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SplitText from "./SplitText";
import Navbar from "./navbar";
import { Router } from "next/navigation";
import Image from "next/image";
import Plant1 from "./assets/1.png";
import Plant2 from "./assets/2.png";
import Plant3 from "./assets/3.png";
import Plant4 from "./assets/4.png";
import { FaWater, FaRobot, FaLeaf } from "react-icons/fa";
import { useRouter } from "next/navigation";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const plantImages = [Plant1, Plant2, Plant3, Plant4];

export default function Hero({ title, description, imageUrl }) {
  const [currentImage, setCurrentImage] = useState(0);

  // This function updates the image index based on animation progress
  const handleImageSwitch = ({ y }) => {
    // y goes from 500 to 0, so we map that to 0-3
    const progress = 1 - Math.max(0, Math.min(1, y / 200));
    const index = Math.floor(progress * (plantImages.length - 1));
    setCurrentImage(index);
  };

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
        transition={{ duration: 1.5, ease: [0.3, 0, 0, 1], delay: 0.7 }}
        className="z-10 rounded-[25px] min-h-[85vh] bg-[#2D411B] overflow-hidden shadow-lg w-full flex flex-col md:flex-row items-center md:items-stretch justify-between p-6 md:p-12"
      >
        <div className="text-left text-[#FBF7F5] md:w-1/2 w-full mb-6 md:mb-0 flex flex-col justify-center space-y-8">
          <div className="text-4xl font-bold">Why Choose PlantCare?</div>
          <div className="flex flex-col gap-6">
            <div className="feature-card p-4 bg-green-800 rounded-lg shadow-md flex items-start gap-4">
              <FaWater className="text-green-300 text-4xl mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Smart Reminders</h3>
                <p className="text-green-200">
                  Never forget to water your plants with personalized daily
                  reminders.
                </p>
              </div>
            </div>
            <div className="feature-card p-4 bg-green-800 rounded-lg shadow-md flex items-start gap-4">
              <FaRobot className="text-green-300 text-4xl mt-1" />
              <div>
                <h3
                  className="text-xl font-semibold"
                  onClick={() => router.push("/chatbot")}
                >
                  AI Plant Assistant
                </h3>
                <p className="text-green-200">
                  Upload photos and get instant care tips using our smart AI
                  chatbot.
                </p>
              </div>
            </div>
            <div className="feature-card p-4 bg-green-800 rounded-lg shadow-md flex items-start gap-4">
              <FaLeaf className="text-green-300 text-4xl mt-1" />
              <div>
                <h3 className="text-xl font-semibold">Easy Setup</h3>
                <p className="text-green-200">
                  Quick onboarding with personalized plant profiles and
                  settings.
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          transition={{ duration: 3, ease: "easeOut", delay: 1.5 }}
          className="flex md:items-end items-center justify-end md:w-1/2 w-full"
          onUpdate={handleImageSwitch}
        >
          <Image
            src={plantImages[currentImage]}
            alt={`Plant${currentImage + 1}`}
            width={353}
            height={500}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
