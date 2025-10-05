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
        className="flex items-center justify-center rounded-[25px] bg-[#2D411B] p-6 md:p-12 shadow-lg overflow-hidden h-[85vh] w-full mx-auto"
      >
        <div className="w-full max-w-2xl">
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 className="text-[48px] font-bold text-[#FBF7F5]">
              Water Reminder Settings
            </h1>
          </div>

          {!user ? (
            <div className="text-center">
              <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] rounded-2xl p-8">
                <div className="text-6xl mb-4">🔒</div>
                <p className="text-[#FBF7F5] text-xl font-medium">
                  Please log in to set reminders.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 shadow-xl">
              {/* Reminder Time Section */}
              <div className="mb-10">
                <div className="text-center mb-6">
                  <h2 className="text-[#FBF7F5] text-2xl font-semibold mb-2">
                    ⏰ Reminder Time
                  </h2>
                  <p className="text-[#FBF7F5] opacity-80 text-sm">
                    Choose when you'd like to be reminded
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="bg-[rgba(255,255,255,0.1)] rounded-xl p-4 border border-[rgba(255,255,255,0.2)]">
                    <input
                      type="time"
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="bg-transparent text-[#FBF7F5] text-2xl font-bold border-none outline-none cursor-pointer text-center w-32"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent mb-10"></div>

              {/* Select Days Section */}
              <div className="mb-10">
                <div className="text-center mb-6">
                  <h2 className="text-[#FBF7F5] text-2xl font-semibold mb-2">
                    📅 Select Days
                  </h2>
                  <p className="text-[#FBF7F5] opacity-80 text-sm">
                    Pick the days for your reminders
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {Object.keys(reminderDays).map((day) => (
                    <motion.button
                      key={day}
                      onClick={() => toggleDay(day)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`h-14 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg ${
                        reminderDays[day]
                          ? "bg-[#F8D4C8] text-[#2D411B] shadow-[#F8D4C8]/30"
                          : "bg-[#4A6B2F] text-[#FBF7F5] hover:bg-[#5A7B3F] shadow-[#4A6B2F]/30"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="font-bold">
                          {day.slice(0, 3).toUpperCase()}
                        </span>
                        <span className="text-xs opacity-80">
                          {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Save Button Section */}
              <div className="text-center pt-4">
                <motion.button
                  onClick={handleSave}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="bg-[#F8D4C8] hover:bg-[#e6b9a7] transition-all duration-200 text-[#2D411B] rounded-xl px-12 py-4 font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#2D411B] border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>💾</span>
                      Save Settings
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
