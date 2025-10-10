// app/api/reminder-send/route.js

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
  const currentDay = now
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  const { data: reminders, error } = await supabase
    .from("reminders")
    .select("*")
    .contains("reminder_days", [currentDay])
    .eq("reminder_time", currentTime);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  for (const reminder of reminders || []) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: reminder.email,
      subject: "🌱 PlantCare - Time to Water Your Plants!",
      text: `It's ${currentTime}! Hey plant parent! 🌼 Your green babies are feeling a little thirsty—time for some love and water ❤️`,
    });
  }

  return NextResponse.json({ success: true });
}
