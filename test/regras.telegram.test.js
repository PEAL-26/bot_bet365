const telegram = require('../src/telegram-api');
const regras = require('../src/regras');
var todosValores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 'preta', 'vermelha'];
var ultimaMensagemId = 0;
var ultimaMensagemTipo = '';

function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

async function mensagem() {
    let analise = regras.MensagemAnalise('Roleta Teste', 'Teste', 'Teste');
    let confirmacao = regras.MensagemConfirmacao('Roleta Teste', 'Teste', 'Teste');
    let falha = regras.MensagemFalha('Roleta Teste', 'Teste');

    await telegram.enviarMensagem(analise.Status);
    await telegram.enviarMensagem(confirmacao.Status);
    await telegram.enviarMensagem(falha.Status);

}

async function testar() {
    for (var i = 0; i <= 50; i++) {

        await delay(2);

        let valorAleatorio = Math.floor(Math.random() * todosValores.length);
        let resultado = regras.AnalisarTodasRegras(todosValores[valorAleatorio], 'Roleta Teste');
        
        if (resultado.Status.tipo == 'confirmacao' && ultimaMensagemId != 0) {
           // await telegram.apagarMensagem(ultimaMensagemId);
            console.error('Apagou mensagem', 'Id:' + ultimaMensagemId);
            ultimaMensagemId = 0;
        }

        if (resultado.Status.tipo != 'info') {
         //   var resultadoTelegram = await telegram.enviarMensagem(resultado.Status.msg);
        }

        if (resultado.Status.tipo == 'confirmacao') {
            ultimaMensagemId = resultadoTelegram?.message_id;
            ultimaMensagemTipo = resultado.Status.tipo;
        }

        console.log(resultado);
        console.log('#'.repeat(100));

        if (resultado.Status.tipo == 'win') {
            break;
        }
    }
}

testar();
//mensagem();