require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { TOKEN, TELEGRAM_CHAT_ID } = process.env;
const bot = new TelegramBot(TOKEN, { polling: true });

async function enviarMensagem(msg) {
    return await bot.sendMessage(TELEGRAM_CHAT_ID, 'teste bot!');
}

async function apagarMensagem(id) {
    return await bot.deleteMessage(TELEGRAM_CHAT_ID, id);
}

module.exports = {
    enviarMensagem,
    apagarMensagem,
}