"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleAuth = async () => {
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert(error.message);
      else router.push("/dashboard");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else
        alert("✅ Sign up successful! (Check email if confirmation required)");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F8D4C8" }} // background color
    >
      <div
        className="w-full max-w-sm shadow-lg rounded-xl p-6"
        style={{ backgroundColor: "#2D411B" }} // neutral light card
      >
        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#ffffffff" }} // primary color
        >
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black mb-3 p-2 rounded focus:outline-none focus:ring-2"
          style={{
            border: "1px solid #8B7B75", // neutral medium
            backgroundColor: "#FFFFFF",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black mb-4 p-2 rounded focus:outline-none focus:ring-2"
          style={{
            border: "1px solid #8B7B75",
            backgroundColor: "#FFFFFF",
          }}
        />

        <button
          onClick={handleAuth}
          className="w-full py-2 rounded-lg transition"
          style={{
            backgroundColor: "#F8D4C8", // primary
            color: "#000000ff", // light neutral text
            fontWeight: "bold",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#F8D4C8")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#F8D4C8")
          }
          onMouseDown={(e) =>
            (e.currentTarget.style.backgroundColor = "#F8D4C8")
          }
          onMouseUp={(e) => (e.currentTarget.style.backgroundColor = "#F8D4C8")}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-center font-medium cursor-pointer"
          style={{ color: "#F1B9A7" }} // accent coral
        >
          {isLogin
            ? "Don’t have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
