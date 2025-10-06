# 🌿 PlantCare Web

**PlantCare Web** is an interactive plant-monitoring and reminder application built with **Next.js**, **Supabase**, and **Framer Motion**.  
It helps users track plant growth, set watering reminders, and visualize plant progress with smooth animations.

---

## 🚀 Features

- 🌱 **Animated Plant Growth Visualization** — Realistic bottom-up plant growth animation using Framer Motion.
- ⏰ **Reminders System** — Set and manage plant-care reminders with Supabase as backend.
- 🧠 **AI-Enhanced Experience** _(optional)_ — Integrates with Gemini or GPT for generating plant insights or visual growth frames.
- 🪴 **User Authentication** — Secure login/signup via Supabase Auth.
- 📊 **Dashboard View** — Displays all your plants, care schedules, and progress.
- 💬 **Chat/Reminder Interaction** — Plan your care routine interactively.
- 💚 **Modern UI** — Clean, minimal, and responsive design with Tailwind CSS.

---

## 🧩 Tech Stack

| Layer           | Technology                              |
| --------------- | --------------------------------------- |
| **Frontend**    | Next.js (App Router)                    |
| **Styling**     | Tailwind CSS + Framer Motion            |
| **Backend**     | Supabase (Database + Auth + API Routes) |
| **Animation**   | Framer Motion                           |
| **Language**    | JavaScript / JSX                        |
| **Optional AI** | Groq                                    |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/plantcare-web.git
cd plantcare-web
```

````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Supabase

Create a **`.env.local`** file in the root directory and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Visit 👉 **[http://localhost:3000](http://localhost:3000)** to view your app.

---

## 🌳 Folder Structure

```
plantcare-web/
├── app/
│   ├── api/           # Supabase API routes (reminders, plants)
│   ├── components/    # Reusable UI components (Navbar, SplitText, Hero, etc.)
│   ├── dashboard/     # Authenticated user dashboard
│   ├── reminder/      # Reminder pages and logic
│   ├── globals.css    # Global styles
│   └── page.jsx       # Main landing page
├── lib/
│   └── supabaseClient.js   # Supabase initialization
├── public/
│   └── assets/        # Images and icons
├── package.json
└── README.md
```

````

## 🌼 How It Works

1. **Sign In / Sign Up** using Supabase Auth.
2. **Add a Plant** — enter plant details like name, watering frequency, etc.
3. **Set a Reminder** — the app sends notification reminders for plant care.
4. **Watch It Grow!** — the animated section displays plant growth frames.

---

## ✨ Example Use-Case

- A user adds a new indoor plant (e.g., “Aloe Vera”).
- Sets watering reminder for every 3 days.
- Sees growth progress animation using 4 frame images.
- Gets reminder notifications on the dashboard.

---

## 🧠 Future Enhancements

- 📱 PWA support for mobile notifications
- 📸 AI-based plant health detection using image input
- 🪴 Community sharing for plant collections
- 💧 IoT integration for real-time soil moisture tracking

---

## 👨‍💻 Developers

**Maitrey Bharambe**
**Atharva Sheramkar**
**Sarvesh Thakur**
**Parth Mandhare**



---

### 🌟 If you like this project, don’t forget to give it a star on GitHub!


