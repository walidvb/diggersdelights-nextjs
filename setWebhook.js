const dotenv = require("dotenv");

dotenv.config();

const setWebhook = async () => {
    const domain = process.env.DOMAIN || process.env.VERCEL_URL
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/setWebhook?url=https://${domain}/api/telegram`
    );
    const data = await response.json();
    return data;
}

setWebhook();