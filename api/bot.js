import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config({ path: ".env.local" });

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
  process.exit(1);
}

// Polling false for production (webhook mode)
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

// Startup message
(async () => {
  try {
    await bot.sendMessage(
      CHAT_ID,
      `🚀 Bot is live!\n⚠️ *This bot is personal and only for authorized use.*\n🕒 Started at: ${new Date().toLocaleString()}`,
      { parse_mode: "Markdown" }
    );
  } catch (err) {
    console.error("Startup Telegram error:", err.response?.data || err.message);
  }
})();

// Send Telegram messages
async function sendTelegramMessage(text) {
  try {
    await bot.sendMessage(CHAT_ID, text, { parse_mode: "Markdown" });
  } catch (err) {
    console.error("Telegram error:", err.response?.data || err.message);
  }
}

// Format GitHub events nicely
function formatGitHubMessage(event, payload) {
  let message = `📢 *GitHub Event:* ${event}\n🕒 ${new Date().toLocaleString()}\n\n`;

  switch (event) {
    case "push":
      message += `👤 *${payload.pusher?.name}* pushed to repository *${payload.repository?.full_name}*\n\n`;
      payload.commits?.slice(0, 5).forEach(c => {
        const commitTime = new Date(c.timestamp).toLocaleString();
        message += `🔹 [Commit](${c.url})\n• Message: _${c.message}_\n• Author: ${c.author?.name}\n• Time: ${commitTime}\n\n`;
      });
      break;

    case "issues":
      message += `🧩 *Issue ${payload.action}*\n• Repository: ${payload.repository?.full_name}\n• Title: _${payload.issue?.title}_\n• Issue #: ${payload.issue?.number}\n• URL: [View Issue](${payload.issue?.html_url})\n• Created by: ${payload.issue?.user?.login}\n• Created at: ${new Date(payload.issue?.created_at).toLocaleString()}\n`;
      break;

    case "pull_request":
      message += `🔀 *Pull Request ${payload.action}*\n• Repository: ${payload.repository?.full_name}\n• Title: _${payload.pull_request?.title}_\n• PR #: ${payload.pull_request?.number}\n• URL: [View PR](${payload.pull_request?.html_url})\n• Created by: ${payload.pull_request?.user?.login}\n• Created at: ${new Date(payload.pull_request?.created_at).toLocaleString()}\n`;
      break;

    case "fork":
      message += `🍴 Repository forked by *${payload.forkee?.full_name}*`;
      break;

    case "watch":
      message += `⭐ Repository starred by *${payload.sender?.login}*`;
      break;

    case "repository":
      message += `🗑️ Repository *${payload.repository?.full_name}* ${payload.action}`;
      break;

    default:
      message += `🗂️ Event received: ${event}`;
      break;
  }

  message += `\n-----------------------------------------\n`;
  return message;
}

// Vercel API handler
export default async function handler(req, res) {
  if (req.method === "POST") {
    const payload = req.body;
    const event = req.headers["x-github-event"] || "unknown";

    const formattedMessage = formatGitHubMessage(event, payload);
    await sendTelegramMessage(formattedMessage);

    return res.status(200).send("✅ GitHub event sent to Telegram!");
  }

  // GET request (health check)
  res.status(200).send("✅ Bot is live! ⚠️ Personal use only.");
}
