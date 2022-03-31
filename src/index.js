require('dotenv').config();
const puppeteer = require('puppeteer');
const telegram = require('./telegram-api');
const regras = require('./regras');
const bet = require('./bet-bot');

async function main(){
    bet = await bet.Iniciar();
}

main();
