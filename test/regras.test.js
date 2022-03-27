var assert = require('chai').assert
const regras = require('../src/regras');

console.log("\n\n=================Sequencia de cor preta======================================================================");
for (var i = 1; i <= 13; i++) {
    if (i <= 9) regras.SequenciaCor("preta");
    if (i > 9) console.log(regras.SequenciaCor("preta"));
}

console.log("\n\n=================Sequencia de cor vermelha======================================================================");
for (var i = 1; i <= 13; i++) {
    if (i <= 9) regras.SequenciaCor("vermelha");
    if (i > 9) console.log(regras.SequenciaCor("vermelha"));
}

console.log("\n\n=================Sequencia de Par======================================================================");
for (var i = 1; i <= 13; i++) {
    if (i <= 9) regras.SequenciaNumeroParImpar(2);
    if (i > 9) console.log(regras.SequenciaNumeroParImpar(2));
}

console.log("\n\n=================Sequencia de impar======================================================================");
for (var i = 1; i <= 13; i++) {
    if (i <= 9) regras.SequenciaNumeroParImpar(3);
    if (i > 9) console.log(regras.SequenciaNumeroParImpar(3));
}

var numerosBaixos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
console.log("\n\n=================Sequencia de Números Baixos======================================================================");
for (var i = 0; i <= numerosBaixos.length - 1; i++) {
    if (i <= 8) regras.SequenciaNumeroBaixoAlto(numerosBaixos[i]);
    if (i > 8) console.log(regras.SequenciaNumeroBaixoAlto(numerosBaixos[i]));
}

console.log("\n\n=================Sequencia de Números Altos======================================================================");
var numerosAltos = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
for (var i = 0; i <= numerosAltos.length - 1; i++) {
    if (i <= 8) regras.SequenciaNumeroBaixoAlto(numerosAltos[i]);
    if (i > 8) console.log(regras.SequenciaNumeroBaixoAlto(numerosAltos[i]));
}

var primeiraDuziaColuna = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log("\n\n=================Sequencia de Números Mesma Dúzia - 1st Coluna======================================================================");
for (var i = 0; i <= primeiraDuziaColuna.length - 1; i++) {
    if (i <= 4) regras.SequenciaNumeroMesmaDuziaColuna(primeiraDuziaColuna[i]);
    if (i > 4) console.log(regras.SequenciaNumeroMesmaDuziaColuna(primeiraDuziaColuna[i]));
}

var segundaDuziaColuna = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
console.log("\n\n=================Sequencia de Números Mesma Dúzia - 2nd Coluna======================================================================");
for (var i = 0; i <= segundaDuziaColuna.length - 1; i++) {
    if (i <= 4) regras.SequenciaNumeroMesmaDuziaColuna(segundaDuziaColuna[i]);
    if (i > 4) console.log(regras.SequenciaNumeroMesmaDuziaColuna(segundaDuziaColuna[i]));
}

var terceiraDuziaColuna = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
console.log("\n\n=================Sequencia de Números Mesma Dúzia - 3rd Coluna======================================================================");
for (var i = 0; i <= terceiraDuziaColuna.length - 1; i++) {
    if (i <= 4) regras.SequenciaNumeroMesmaDuziaColuna(terceiraDuziaColuna[i]);
    if (i > 4) console.log(regras.SequenciaNumeroMesmaDuziaColuna(terceiraDuziaColuna[i]));
}

var primeiraDuziaLinha = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
console.log("\n\n=================Sequencia de Números Mesma Dúzia - 1st Linha======================================================================");
for (var i = 0; i <= primeiraDuziaLinha.length - 1; i++) {
    if (i <= 4) regras.SequenciaNumeroMesmaDuziaLinha(primeiraDuziaLinha[i]);
    if (i > 4) console.log(regras.SequenciaNumeroMesmaDuziaLinha(primeiraDuziaLinha[i]));
}

var segundaDuziaLinha = [1, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
console.log("\n\n=================Sequencia de Números Mesma Dúzia - 2nd Linha======================================================================");
for (var i = 0; i <= segundaDuziaLinha.length - 1; i++) {
    if (i <= 4) regras.SequenciaNumeroMesmaDuziaLinha(segundaDuziaLinha[i]);
    if (i > 4) console.log(regras.SequenciaNumeroMesmaDuziaLinha(segundaDuziaLinha[i]));
}

var terceiraDuziaLinha = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
console.log("\n\n=================Sequencia de Números Mesma Dúzia - 3rd Linha======================================================================");
for (var i = 0; i <= terceiraDuziaLinha.length - 1; i++) {
    if (i <= 4) regras.SequenciaNumeroMesmaDuziaLinha(terceiraDuziaLinha[i]);
    if (i > 4) console.log(regras.SequenciaNumeroMesmaDuziaLinha(terceiraDuziaLinha[i]));
}

console.log("\n\n=================Analisando todas as regras======================================================================");
regras.Restart();
var todosValores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 'preta', 'vermelha'];
for (var i = 0; i <= 50; i++) {
    let valorAleatorio = Math.floor(Math.random() * todosValores.length);
    console.log(regras.AnalisarTodasRegras(todosValores[valorAleatorio]));
}

describe('String', function () {
    it('Sequencia de cor preta', function () {
        for (var i = 1; i <= 9; i++) {
            regras.SequenciaCor("preta");
        }

        assert.equal(regras.SequenciaCor("preta").Mensagem.tipo, "info");
        assert.equal(regras.SequenciaCor("preta").Mensagem.tipo, "analise");
        assert.equal(regras.SequenciaCor("preta").Mensagem.tipo, "successo");
        assert.equal(regras.SequenciaCor("preta").Mensagem.tipo, "falha");

    })
})
