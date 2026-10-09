# 🛒 BazarDor (বাজার দর) — Daily Commodity Price Tracker

A modern and responsive web application built to monitor real-time daily commodity prices across major local kitchen markets in Bangladesh. Users can explore everyday essentials, track market trends, compare prices across different bazars, and view detailed price breakdowns.

---

## 🔗 Project Links
- **Live Website:** [https://bazardor.vercel.app](https://bazardor.vercel.app)
- **GitHub Repository:** [https://github.com/nipun-roy/BazarDor](https://github.com/nipun-roy/BazarDor)

---

## 🚀 Key Features

1. **Live Infinite Price Ticker Marquee:**
   - A smooth, infinitely scrolling price ticker below the navigation bar showing commodity icons, names, current prices, and change percentages (▲ / ▼) with Bengali numerals.

2. **Daily Market Trends (Top Risers & Fallers):**
   - Automatically computes and highlights today's top 6 price risers and top 6 price fallers to keep consumers informed.

3. **Category Filtering & Bengali Numeric Sorting (Challenge C1):**
   - Filter commodities by 8 distinct categories: Rice (চাল), Lentils (ডাল), Oil (তেল), Vegetables (সবজি), Fish (মাছ), Meat (মাংস), Dairy & Eggs (ডিম-দুধ), and Spices (মসলা).
   - Custom sorting logic converting Bengali numerals into numeric values to correctly sort by "Low to High" and "High to Low".

4. **Protected Product Details & Market Breakdown:**
   - Secured route accessible only to authenticated users.
   - Comprehensive market analytics displaying minimum, maximum, and average prices alongside bazar-wise price breakdowns (e.g., Karwan Bazar, Mirpur-1, Shantinagar).

5. **Authentication & Profile Update Feature (Challenge C3):**
   - Secure authentication powered by BetterAuth and MongoDB Atlas supporting Email/Password, Google OAuth, and GitHub OAuth.
   - Profile management with dynamic name update functionality via BetterAuth's `updateUser` API.

6. **Responsive UI & Robust Error Handling:**
   - Fully responsive design matching Figma specifications across mobile, tablet, and desktop viewports.
   - Custom friendly 404 page, skeleton loading indicators during data fetching, and toast notifications for user interactions.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Lucide React Icons
- **Authentication:** [BetterAuth](https://better-auth.com/) (Email/Password, Google, GitHub OAuth)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/)
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

---

## ⚙️ Installation & Local Setup

Follow these steps to run the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nipun-roy/BazarDor.git
   cd BazarDor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   BETTER_AUTH_SECRET=your_secret_key_here
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 👨‍💻 Author

- **Name:** Nipun Roy
- **GitHub:** [@nipun-roy](https://github.com/nipun-roy)
