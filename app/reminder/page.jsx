'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import SplitText from "../components/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function Home() {
  const [reminderTime, setReminderTime] = useState('08:00');
  const [reminderDays, setReminderDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const toggleDay = (day) => {
    setReminderDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSave = () => {
    alert(`Reminder saved for ${reminderTime} on days: ${
      Object.entries(reminderDays)
        .filter(([_, selected]) => selected)
        .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
        .join(', ') || 'No days selected'
    }`);
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
        className="flex flex-col rounded-[25px] bg-[#2D411B] p-6 md:p-12 shadow-lg overflow-hidden min-h-[85vh] w-full mx-auto text-left"
      >
        <h1 className="text-[40px] font-bold text-[#FBF7F5] mb-8 text-center">Water Reminder Settings</h1>

        <label className="block mb-6 text-[#FBF7F5] font-semibold">
          Reminder Time:
          <input
            type="time"
            value={reminderTime}
            onChange={e => setReminderTime(e.target.value)}
            className="mt-2 w-full rounded-lg p-3 text-[#2D411B]"
          />
        </label>

        <div className="mb-6">
          <p className="text-[#FBF7F5] font-semibold mb-2">Select Days:</p>
          <div className="flex flex-wrap gap-3">
            {Object.keys(reminderDays).map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  reminderDays[day] ? 'bg-[#F8D4C8] text-[#2D411B]' : 'bg-[#4A6B2F] text-[#FBF7F5]'
                }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="bg-[#F8D4C8] hover:bg-[#e6b9a7] transition text-[#2D411B] rounded-lg px-6 py-3 font-semibold mx-auto block"
        >
          Save Settings
        </button>
      </motion.div>
    </div>
  );
}
