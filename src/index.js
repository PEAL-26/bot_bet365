require('dotenv').config();
const puppeteer = require('puppeteer');
const telegram = require('./telegram-api');
const regras = require('./regras');

const USER = process.env.BET_USER
const PASSWORD = process.env.BET_PASSWORD;
const URL = process.env.BET_URL;

const LAUNCH_OPTIONS = {
    headless: false,
    timeout: 0,
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
};

async function Start() {
    console.log('Iniciando...');
    const browser = await puppeteer.launch(LAUNCH_OPTIONS);

    console.log('Acessando página...');
    const page = await browser.newPage();
    await page.goto(URL, { timeout: 0 });

    console.log('Preencher usuário e senha...');
    var login = await page.waitForFunction(
        (user, password) => {
            document.querySelector('#header__logged-out-log-in-link').click();
            document.querySelector('#txtUsername').value = user
            document.querySelector('#txtPassword').value = password
            var result = document.querySelector('#txtUsername').value.length == user.length &&
                document.querySelector('#txtPassword').value.length == password.length
            return result;
        },
        {},
        USER, PASSWORD
    );

    await page.waitForTimeout(1000).then(async () => {
        await page.click('[type="submit"]');
    });

    await page.waitForNavigation({ timeout: 0 });

    var selectorContinuando = 'button[class="regulatory-last-login-modal__button"]';
    await page.waitForSelector(selectorContinuando).then(async () => {
        console.log('Continuando-> Logado...');
        page.evaluate((btnSelector) => {
            document.querySelector(btnSelector).click();
        }, selectorContinuando);
    }).catch(async (e) => {
        console.error(e);
    });

    var selectorConfiguracaoCookies = 'button[class="third-party-cookie-check__button"]';
    await page.waitForSelector(selectorConfiguracaoCookies).then(async () => {
        console.log('OK-> Configurações de cookies do seu navegador...');
        page.evaluate((btnSelector) => {
            document.querySelector(btnSelector).click();
        }, selectorConfiguracaoCookies);
    }).catch(async (e) => {
        console.error(e);
    });

    var selectorOferta = 'button[class="overlay-banner__close-button"]';
    await page.waitForSelector(selectorOferta).then(async () => {
        console.log('FECHAR-> Ofertas Diárias...');
        page.evaluate((btnSelector) => {
            document.querySelector(btnSelector).click();
        }, selectorOferta);
    }).catch(async (e) => {
        console.error(e);
    });

    var LiveRoulette = 'img[class="static-games-grid-game-pod__image b-loaded"]';
    await page.waitForSelector(LiveRoulette).then(async () => {
        console.log('Abrir Roleta ao Vivo...');
        page.evaluate((btnSelector) => {
            document.querySelector(btnSelector).click();
        }, LiveRoulette);
    }).catch(async (e) => {
        console.error(e);
    });

    //await page.waitForNavigation({ timeout: 0 });

}

//Start();




var regra = new regras.Regras();
regra.AnalisarTodasRegras('preta', 'teste')
var resultado = regra.AnalisarTodasRegras('preta', 'teste')
console.log(resultado);

var regra = new regras.Regras();
var resultado = regra.AnalisarTodasRegras('preta', 'teste')
console.log(resultado);