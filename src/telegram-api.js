require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Promise = require('bluebird');
  Promise.config({
    cancellation: true
  });
  
const { TOKEN, TELEGRAM_CHAT_ID } = process.env;

async function enviarMensagem(msg) {
    const bot = new TelegramBot(TOKEN, { polling: false });
    return await bot.sendMessage(TELEGRAM_CHAT_ID, msg);
}

async function apagarMensagem(id) {
    const bot = new TelegramBot(TOKEN, { polling: false });
    return await bot.deleteMessage(TELEGRAM_CHAT_ID, id);
}

module.exports = {
    enviarMensagem,
    apagarMensagem,
}