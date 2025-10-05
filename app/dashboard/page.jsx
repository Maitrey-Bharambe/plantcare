// app/dashboard/page.jsx
"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import SplitText from "../components/SplitText";
import Navbar from "../components/navbar";
const handleAnimationComplete = () => {
  console.log("All letters have animated!");
}

// 🌿 Consistent Palette
const palette = {
  darkOlive: "#414d28",
  peach: "#ffd7c3",
  sage: "#a4b787",
  beige: "#e7dbc8",
  yellow: "#f2ea7e",
  blush: "#e5b7b1",
  clay: "#a66d58",
  white: "#ffffff",
  fern: "#91d925",
  gray: "#525252",
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: "",
    img: "",
    status: "Healthy",
  });
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("plants")
        .select("*")
        .eq("user_id", user.id);

      if (error) console.error(error);
      else setPlants(data || []);

    };

    getData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  const handleAddPlant = async (e) => {
    e.preventDefault();
    if (!newPlant.name) return;

    const { data, error } = await supabase
      .from("plants")
      .insert([
        {
          ...newPlant,
          user_id: user.id,
          last_watered: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return;
    }

    setPlants((prev) => [...prev, ...data]); // live update
    setNewPlant({ name: "", img: "", status: "Healthy" });
    setShowForm(false);
  };

  return (
    <div className="dashboard bg-[#F8D4C8] overflow-y-scroll p-8 min-h-screen flex justify-center items-center relative text-center">
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
                  className="z-10 rounded-[25px] min-h-[85vh] bg-[#2D411B] overflow-hidden shadow-lg w-full flex"
                >
            {/* Left Sidebar Panel */}
            <div
              style={{
                background: palette.fern,
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '48px 32px',
                borderTopLeftRadius: '25px',
                borderBottomLeftRadius: '25px',
                position: 'relative'
              }}
            >
              {/* Back Button - Top Left */}
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 10px #a4b787" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: palette.beige,
                  color: palette.darkOlive,
                  padding: "8px 20px",
                  fontWeight: 600,
                  borderRadius: 14,
                  border: "none",
                  fontSize: 14,
                  cursor: "pointer",
                  position: 'absolute',
                  top: '24px',
                  left: '24px'
                }}
                onClick={() => router.push("/")}
              >
                ← Back
              </motion.button>

              {/* Logout Button - Top Right */}
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #a4b787" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: palette.sage,
                  color: palette.darkOlive,
                  padding: "8px 20px",
                  fontWeight: 600,
                  borderRadius: 14,
                  border: "none",
                  fontSize: 14,
                  cursor: "pointer",
                  position: 'absolute',
                  top: '24px',
                  right: '24px'
                }}
                onClick={handleLogout}
              >
                Log out
              </motion.button>

              {/* Centered Content */}
              <div className="text-center space-y-6">
                <motion.h1
                  style={{
                    color: palette.darkOlive,
                    fontWeight: 700,
                    fontSize: "2.2rem",
                    letterSpacing: 1,
                    marginBottom: '24px'
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  PlantCare
                  <br />
                  Dashboard
                </motion.h1>
                
                <div 
                  style={{
                    padding: '20px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '16px',
                    marginTop: '32px'
                  }}
                >
                  <p style={{ 
                    color: palette.clay, 
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}>
                    Welcome back! 👋
                  </p>
                  <p style={{ 
                    color: palette.darkOlive, 
                    fontSize: 16,
                    wordBreak: 'break-word'
                  }}>
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Main Dashboard Panel */}
            <div className="flex-1 flex flex-col">
              {/* Header Section */}
              <div 
                style={{
                  padding: '32px 40px 24px',
                  borderBottom: `1px solid rgba(164, 183, 135, 0.2)`
                }}
              >
                <div className="flex justify-between items-center">
                  <h2
                    style={{
                      color: palette.white,
                      fontSize: 32,
                      fontWeight: 800,
                      letterSpacing: 1,
                      margin: 0
                    }}
                  >
                    Your Plants
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(true)}
                    style={{
                      background: palette.fern,
                      color: palette.darkOlive,
                      padding: "12px 24px",
                      fontWeight: 700,
                      borderRadius: 16,
                      border: "none",
                      fontSize: 16,
                      cursor: "pointer",
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    ➕ Add Plant
                  </motion.button>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8">
                {plants.length === 0 ? (
                  <div 
                    className="flex flex-col items-center justify-center h-full"
                    style={{
                      minHeight: '400px'
                    }}
                  >
                    <div 
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        padding: '48px',
                        textAlign: 'center',
                        border: '2px dashed rgba(164, 183, 135, 0.3)'
                      }}
                    >
                      <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌱</div>
                      <p style={{ 
                        color: palette.beige, 
                        fontSize: 24,
                        fontWeight: 600,
                        marginBottom: '8px'
                      }}>
                        No plants added yet
                      </p>
                      <p style={{ 
                        color: palette.sage, 
                        fontSize: 16
                      }}>
                        Start building your plant collection!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="grid gap-8"
                    style={{
                      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    }}
                  >
                    {plants.map((plant) => (
                      <motion.div
                        key={plant.id}
                        whileHover={{
                          scale: 1.03,
                          rotate: 0.5,
                          boxShadow: "0 8px 35px rgba(145,217,37,0.3)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 180 }}
                        style={{
                          background: palette.white,
                          borderRadius: 20,
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 370,
                          position: "relative",
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}
                      >
                        {/* 🌿 Animated Shine Effect */}
                        <motion.div
                          className="absolute top-0 left-0 w-full h-full"
                          style={{
                            background:
                              "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                            zIndex: 10,
                            pointerEvents: 'none'
                          }}
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{
                            repeat: Infinity,
                            duration: 6,
                            ease: "linear",
                          }}
                        />

                        <div
                          style={{
                            width: "100%",
                            height: 210,
                            position: "relative",
                          }}
                        >
                          <Image
                            src={plant.img || "/plants/default.jpg"}
                            alt={plant.name}
                            fill
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div style={{ padding: "24px 22px 20px" }}>
                          <h3
                            style={{
                              color: palette.darkOlive,
                              fontWeight: 700,
                              fontSize: 22,
                              marginBottom: 12,
                            }}
                          >
                            {plant.name}
                          </h3>
                          <div
                            style={{
                              color: palette.gray,
                              fontSize: 14,
                              marginBottom: 16,
                            }}
                          >
                            Last watered:{" "}
                            {new Date(plant.last_watered).toLocaleDateString()}
                          </div>
                          <motion.span
                            whileHover={{ scale: 1.1, rotate: -2 }}
                            style={{
                              background: palette.fern,
                              color: palette.darkOlive,
                              borderRadius: 10,
                              padding: "6px 16px",
                              fontWeight: 700,
                              fontSize: 14,
                              display: "inline-block",
                            }}
                          >
                            {plant.status || "Healthy"}
                          </motion.span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal for Add Plant */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur filter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ opacity: 1, y: 1000 }}
                    animate={{ opacity: 1, y: 20 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.3, 0, 0, 1], delay: 0 }}
                    style={{
                      background: palette.peach,
                      padding: "32px 28px",
                      borderRadius: 22,
                      width: 400,
                      textAlign: "center",
                    }}
                  >
                    <h3
                      style={{
                        color: palette.darkOlive,
                        fontSize: 22,
                        fontWeight: 700,
                        marginBottom: 16,
                      }}
                    >
                      🌱 Add New Plant
                    </h3>
                    <form
                      onSubmit={handleAddPlant}
                      className="flex flex-col gap-4"
                    >
                      <input
                        type="text"
                        placeholder="Plant Name"
                        value={newPlant.name}
                        onChange={(e) =>
                          setNewPlant({ ...newPlant, name: e.target.value })
                        }
                        className="border border-black p-2 rounded-lg text-black"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Image URL (optional)"
                        value={newPlant.img}
                        onChange={(e) =>
                          setNewPlant({ ...newPlant, img: e.target.value })
                        }
                        className="border border-black p-2 rounded-lg text-black"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="text-[#414d28] p-2.5 font-bold rounded-lg border-4 border-[#91d925] rounded-lg px-4 py-2 hover:bg-[#91d925] hover:text-white transition"
                      >
                        Save Plant 🌿
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="mt-2 text-red-500 font-bold border-4 border-red-500 rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition"
                      >
                        Cancel
                      </motion.button>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
    </div>
  );
}
