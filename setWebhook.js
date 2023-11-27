const dotenv = require("dotenv");

dotenv.config();

const setWebhook = async () => {
    const domain = process.env.DOMAIN || 'diggersdelights.vercel.app'
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/setWebhook?url=https://${domain}/api/telegram`
    );
    const data = await response.json();
    return data;
}

setWebhook();