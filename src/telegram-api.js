require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// const Promise = require('bluebird');
// Promise.config({
//   cancellation: true
// });

const { TOKEN, TELEGRAM_CHAT_ID } = process.env;
const bot = new TelegramBot(TOKEN, { polling: false });

export async function enviarMensagem(msg) {
  const msg = bot.sendMessage(TELEGRAM_CHAT_ID, msg);
  return msg
}

export async function apagarMensagem(id) {
  const msg = await bot.deleteMessage(TELEGRAM_CHAT_ID, id);
  return msg;
}
