import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import cron from "node-cron";

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

// Runs every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
  const currentDay = now
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  // Fetch reminders for this time and day
  const { data: reminders, error } = await supabase
    .from("reminders")
    .select("*")
    .contains("reminder_days", [currentDay])
    .eq("reminder_time", currentTime);

  if (error) {
    console.error("DB Error:", error);
    return;
  }

  for (const reminder of reminders || []) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: reminder.email,
      subject: "🌱 PlantCare - Time to Water Your Plants!",
      text: `It's ${currentTime}! Hey plant parent! 🌼 Your green babies are feeling a little thirsty—time for some love and water ❤️`,
    });
    console.log(`Sent reminder to ${reminder.email}`);
  }
});
