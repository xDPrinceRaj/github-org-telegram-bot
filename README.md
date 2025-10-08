# 🤖 GitHub → Telegram Bot  

![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)

> A **personal-use automation bot** that bridges GitHub and Telegram — get **instant, elegant updates** for every commit, issue, pull request, fork, or star in your repositories.  
> Designed for precision, privacy, and productivity.  

---

## ⚙️ Key Features  

✅ **Instant GitHub → Telegram Alerts**  
✅ **Rich Markdown + Emoji Formatting** for clarity  
✅ **Startup Notice** when bot launches  
✅ **Secure** `.env` based configuration (no secrets in code)  
✅ **Event Coverage:** Push • Issues • Pull Request • Fork • Star  
✅ **Serverless Ready** via **Vercel Deployment**  
✅ **Zero Downtime**, **Zero Polling**, Pure **Webhook Integration**  

---

## 🧩 Tech Stack  

| Component | Purpose |
|------------|----------|
| 🟩 Node.js | Core runtime environment |
| ⚡ Express / Vercel API | Lightweight serverless backend |
| 💬 node-telegram-bot-api | Telegram bot communication |
| 🔐 dotenv | Securely load environment variables |
| ☁️ Vercel | Deployment platform for serverless functions |

---

## 🚀 How It Works  

1. Your bot is deployed as a **Vercel API function**.  
2. GitHub sends **webhook events** to your bot endpoint.  
3. The bot receives the payload, formats it beautifully, and sends it to your Telegram chat.  

---

## 🧠 Setup Guide  

### 1️⃣ Create Your Telegram Bot  

1. Open Telegram and start a chat with **[@BotFather](https://t.me/BotFather)**  
2. Run `/newbot` and follow the instructions  
3. Copy your **Bot Token** (keep it private)  

---

### 2️⃣ Get Your Telegram Chat ID  

1. Open [@userinfobot](https://t.me/userinfobot) on Telegram  
2. Send `/start`  
3. Copy the **Chat ID** displayed  

---

### 3️⃣ Create `.env.local`  

In your project root folder, create a new file named `.env.local` and add:

```env
TELEGRAM_TOKEN=your_bot_token_here
CHAT_ID=your_chat_id_here
