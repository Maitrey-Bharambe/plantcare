// app/api/reminder/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

// Supabase client
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

export async function POST(req) {
  try {
    const body = await req.json();
    const { user_id, reminder_time, reminder_days, email } = body;

    // 1. Save reminder in Supabase
    const { error } = await supabase
      .from("reminders")
      .insert([{ user_id, reminder_time, reminder_days }]);

    if (error) {
      console.error("DB Error:", error);
      return NextResponse.json(
        { error: "Failed to save reminder" },
        { status: 500 }
      );
    }

    // 2. Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🌱 PlantCare - Water Reminder Set",
      text: `Your reminder has been set for ${reminder_time} on ${reminder_days.join(
        ", "
      )}.`,
    });

    return NextResponse.json(
      { message: "Reminder saved and email sent!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
