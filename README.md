# PopX Auth UI - Pixel-Perfect Mobile Interface

A stunning, pixel-perfect, and fully responsive user authentication interface modeled after the classic **PopX** design specification. The application is built using React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion, and is optimized for static hosting platforms like Vercel.

---

## ✨ Features

- **📱 Centered Device Frame:** On desktop, the entire application is housed inside a high-fidelity simulated smartphone shell. On mobile viewports, it scales dynamically to fill the browser's viewport.
- **🕒 Interactive Status Bar:** Features a live updating 12-hour clock (AM/PM) and status icons (Wifi, cellular signal, battery strength) matching native platforms.
- **📂 State-Persistent Local Auth Fallback:** Dual-mode authentication hook that connects to an Express server if available, or falls back to a browser `localStorage` mock database automatically in production (Vercel). User accounts persist across page refreshes.
- **✨ Fluid Framer Motion Transitions:** Native-like slide-left/slide-right page transitions and custom spring-loaded physical interactions on click/tap events.
- **🏷️ Interactive Floating Borders & Labels:** Peer-focus text highlights that shift text labels to primary violet when elements are active.
- **👁️ Password Visibility Toggles:** Clean absolute eye icons for password masking/unmasking.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (TypeScript)
- **Bundler:** Vite 8
- **Styles:** Tailwind CSS v4 (PostCSS & Autoprefixer)
- **Animations:** Framer Motion 12
- **Icons:** Lucide React

---

## 🚀 How to Run Locally

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Setup
Clone or download the project, navigate to the `popx-auth-ui` folder, and install the npm dependencies:
```bash
# Install dependencies
npm install
```

### 3. Run Development Server
```bash
# Start Vite local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Production Build Check

To compile and verify the optimized static output bundle, run:
```bash
# Compile and build production bundle
npm run build
```
The output will be generated inside the `dist/` directory, which is ready to upload directly to Vercel, Netlify, or AWS.

---

## ☁️ Hosting on Vercel

The application is fully client-side self-contained with persistent state, meaning it requires **no backend databases or APIs to spin up**.

### Option A: Vercel CLI (Fastest)
Run the following in the project root:
```bash
npm install -g vercel
vercel
```
*Simply press Enter for all default setup options.*

### Option B: Import to Vercel Dashboard
1. Upload this codebase to a repository on **GitHub**, **GitLab**, or **Bitbucket**.
2. Connect your repository to your **Vercel** account.
3. Import the repository. Vercel will automatically discover the Vite environment and configure the build commands.
4. Click **Deploy**!
