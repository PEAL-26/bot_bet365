import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config();

const USER = process.env.BET_USER;
const PASSWORD = process.env.BET_PASSWORD;
const URL = process.env.BET_URL;

const LAUNCH_OPTIONS = {
    headless: false,
    timeout: 0,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
};

export async function Iniciar() {
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

    //Botão voltar para todas as roletas
    {/* <a href="https://casino.bet365.com/home" class="inline-games-page-component__game-header-left-lobby-text" aria-label="Lobby">
                            <span class="inline-games-page-component__game-header-left-arrow">
                                    <img src="//content001.bet365.com/Casino/SGP/GamesPage/Chevron.svg" alt="Lobby">
                            </span>
                            
                        </a> */}

    //voltar depois da rodada ao vivo terminar
    var selectorRodada = 'button[class="live-roulette-game-page__button"]';

    //inatividade durante muito tempo
    var selectorInatividade = 'button[class="live-roulette-game-page__button"]';
}
