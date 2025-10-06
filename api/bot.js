import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config({ path: ".env.local" }); // explicitly specify path if needed

// =====================
// ⚠️ Startup Warning
// =====================
console.log("===========================================");
console.log("⚠️  PERSONAL USE BOT - DO NOT SHARE ⚠️");
console.log("===========================================");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!TELEGRAM_TOKEN || !CHAT_ID) {
  console.error("❌ TELEGRAM_TOKEN or CHAT_ID not set!");
}

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

async function sendTelegramMessage(text) {
  try {
    await bot.sendMessage(CHAT_ID, text, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("Telegram error:", err.response?.data || err.message);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const payload = req.body;
    const event = req.headers["x-github-event"] || "unknown";

    let message = `📢 *GitHub Event:* ${event}\n\n`;

    if (event === "push") {
      message += `👤 *${payload.pusher?.name}* pushed to repository *${payload.repository?.full_name}*\n\n`;
      payload.commits?.slice(0, 5).forEach(c => {
        message += `🔹 [Commit](${c.url})\n`;
        message += `• Message: _${c.message}_\n`;
        message += `• Author: ${c.author?.name}\n\n`;
      });
    } else if (event === "issues") {
      message += `🧩 *Issue ${payload.action}*\n`;
      message += `• Repository: ${payload.repository?.full_name}\n`;
      message += `• Title: _${payload.issue?.title}_\n`;
      message += `• Issue #: ${payload.issue?.number}\n`;
      message += `• URL: [View Issue](${payload.issue?.html_url})\n`;
      message += `• Created by: ${payload.issue?.user?.login}\n`;
    } else if (event === "pull_request") {
      message += `🔀 *Pull Request ${payload.action}*\n`;
      message += `• Repository: ${payload.repository?.full_name}\n`;
      message += `• Title: _${payload.pull_request?.title}_\n`;
      message += `• PR #: ${payload.pull_request?.number}\n`;
      message += `• URL: [View PR](${payload.pull_request?.html_url})\n`;
      message += `• Created by: ${payload.pull_request?.user?.login}\n`;
    } else {
      message += `🗂️ Event received: ${event}`;
    }

    await sendTelegramMessage(message);
    return res.status(200).send("OK");
  }

  // GET request (health check)
  res.status(200).send("✅ Bot is live! ⚠️ Personal use only.");
}
