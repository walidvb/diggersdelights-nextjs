const dotenv = require("dotenv");
const { Bot } = require("grammy");

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
const getWebhookStatus = async () => {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/getWebhookInfo`
    );
    const data = await response.json();
    console.log(data);
    return data;
}

getWebhookStatus();