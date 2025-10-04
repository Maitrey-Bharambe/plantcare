// app/dashboard/page.jsx
"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

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

      setLoading(false);
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
    <div
      style={{ background: palette.peach, minHeight: "100vh", width: "100vw" }}
      className="overflow-x-hidden"
    >
      <AnimatePresence>
        {loading ? (
          // 🌿 Loader with growth animation
          <motion.div
            key="loader"
            className="flex items-center justify-center h-screen flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1.2, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-6xl"
            >
              🌱
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-7xl"
            >
              🌿
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-8xl"
            >
              🌳
            </motion.div>
            <motion.p
              className="mt-6 text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              style={{ color: palette.darkOlive }}
            >
              Growing your PlantCare Dashboard...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Header */}
            <header
              style={{
                background: palette.peach,
                borderBottom: `2px solid ${palette.sage}`,
                padding: "32px 0 14px",
              }}
              className="flex justify-between items-center px-12"
            >
              <div className="flex items-center gap-6">
                {/* 🌿 Back Button */}
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
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() => router.push("/")}
                >
                  ← Back
                </motion.button>
                <motion.h1
                  style={{
                    color: palette.darkOlive,
                    fontWeight: 700,
                    fontSize: "2rem",
                    letterSpacing: 1,
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  PlantCare Dashboard🌱
                </motion.h1>
              </div>
              <div className="flex items-center gap-7">
                <span style={{ color: palette.clay, fontSize: 20 }}>
                  Hi, {user?.email}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px #a4b787" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: palette.sage,
                    color: palette.darkOlive,
                    padding: "11px 32px",
                    fontWeight: 600,
                    borderRadius: 18,
                    border: "none",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  Log out
                </motion.button>
              </div>
            </header>

            {/* Plant Section */}
            <main className="mx-auto w-full max-w-6xl p-8 mt-10">
              <div className="flex justify-between items-center">
                <h2
                  style={{
                    color: palette.darkOlive,
                    fontSize: 26,
                    fontWeight: 800,
                    marginBottom: 24,
                    letterSpacing: 1,
                  }}
                >
                  Your Plants
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  style={{
                    background: palette.fern,
                    color: palette.darkOlive,
                    padding: "10px 22px",
                    fontWeight: 700,
                    borderRadius: 14,
                    border: "none",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                >
                  ➕ Add Plant
                </motion.button>
              </div>

              {plants.length === 0 ? (
                <p style={{ color: palette.gray }}>No plants added yet 🌱</p>
              ) : (
                <div
                  className="grid gap-10"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                  }}
                >
                  {plants.map((plant) => (
                    <motion.div
                      key={plant.id}
                      whileHover={{
                        scale: 1.05,
                        rotate: 0.5,
                        boxShadow: "0 0 35px rgba(145,217,37,0.5)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 180 }}
                      style={{
                        background: palette.darkOlive,
                        borderRadius: 26,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 370,
                        position: "relative",
                      }}
                    >
                      {/* 🌿 Animated Shine Effect */}
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                          background:
                            "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                        }}
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{
                          repeat: Infinity,
                          duration: 5,
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
                            borderTopLeftRadius: 26,
                            borderTopRightRadius: 26,
                          }}
                        />
                      </div>
                      <div style={{ padding: "24px 22px 18px" }}>
                        <h3
                          style={{
                            color: palette.white,
                            fontWeight: 700,
                            fontSize: 22,
                            marginBottom: 10,
                          }}
                        >
                          {plant.name}
                        </h3>
                        <div
                          style={{
                            color: palette.beige,
                            fontSize: 16,
                            marginBottom: 13,
                          }}
                        >
                          Last watered:{" "}
                          {new Date(plant.last_watered).toLocaleDateString()}
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.2, rotate: -3 }}
                          style={{
                            background: palette.fern,
                            color: palette.darkOlive,
                            borderRadius: 8,
                            padding: "5px 17px",
                            fontWeight: 700,
                            fontSize: 15,
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
            </main>

            {/* Modal for Add Plant */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    style={{
                      background: palette.white,
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
                        className="border p-2 rounded-lg"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Image URL (optional)"
                        value={newPlant.img}
                        onChange={(e) =>
                          setNewPlant({ ...newPlant, img: e.target.value })
                        }
                        className="border p-2 rounded-lg"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        style={{
                          background: palette.fern,
                          color: palette.darkOlive,
                          padding: "10px",
                          fontWeight: 700,
                          borderRadius: 10,
                        }}
                      >
                        Save Plant 🌿
                      </motion.button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="mt-2 text-red-500 font-bold"
                      >
                        Cancel
                      </button>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
