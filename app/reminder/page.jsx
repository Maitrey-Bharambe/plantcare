"use client";
import React, { useState, useEffect } from "react";
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
  const [reminderTime, setReminderTime] = useState("08:00");
  const [reminderDays, setReminderDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    };
    getUser();
  }, []);

  const toggleDay = (day) => {
    setReminderDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save reminders.");
      return;
    }

    const selectedDays = Object.entries(reminderDays)
      .filter(([_, selected]) => selected)
      .map(([day]) => day);

    if (selectedDays.length === 0) {
      alert("Please select at least one day.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user.id,
          email: user.email,
          reminder_time: reminderTime,
          reminder_days: selectedDays,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.error || "Failed to save reminder.");
      }
    } catch (error) {
      console.error("Error saving reminder:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
        className="flex flex-col rounded-[25px] bg-[#2D411B] p-6 md:p-12 shadow-lg overflow-hidden min-h-[85vh] w-full mx-auto text-left"
      >
        <h1 className="text-[40px] font-bold text-[#FBF7F5] mb-8 text-center">
          Water Reminder Settings
        </h1>

        {!user ? (
          <div className="text-[#FBF7F5] text-center">
            Please log in to set reminders.
          </div>
        ) : (
          <>
            <label className="block mb-6 text-[#FBF7F5] font-semibold">
              Reminder Time:
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="mt-2 w-full rounded-lg p-3 text-white border-s-white"
              />
            </label>

            <div className="mb-6">
              <p className="text-[#FBF7F5] font-semibold mb-2">Select Days:</p>
              <div className="flex flex-wrap gap-3">
                {Object.keys(reminderDays).map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      reminderDays[day]
                        ? "bg-[#F8D4C8] text-[#2D411B]"
                        : "bg-[#4A6B2F] text-[#FBF7F5]"
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-[#F8D4C8] hover:bg-[#e6b9a7] transition text-[#2D411B] rounded-lg px-6 py-3 font-semibold mx-auto block"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
