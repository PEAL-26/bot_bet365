const NUMERO_MININO = 1;
const NUMERO_MAXIMO = 36;

const ESTRATEGIA = {
    CorPreta: { msg: 'Sequência de Pretos', entrada: 'Vermelho' },
    CorVermelha: { msg: 'Sequência de Vermelhos', entrada: 'Preto' },
    NumeroPar: { msg: 'Sequência de Números Pares', entrada: 'Ímpar' },
    NumeroImpar: { msg: 'Sequência de Números Ímpares', entrada: 'Par' },
    NumeroBaixo: { msg: 'Sequência de Números Baixos', entrada: 'Alto' },
    NumeroAlto: { msg: 'Sequência de Números Altos', entrada: 'Baixo' },
    NumeroMesmaDuziaColuna1: { msg: 'Sequência de Números da Mesma Dúzia - Coluna 1st', entrada: 'Coluna 2nd e 3rd' },
    NumeroMesmaDuziaColuna2: { msg: 'Sequência de Números da Mesma Dúzia - Coluna 2nd', entrada: 'Coluna 1st e 3rd' },
    NumeroMesmaDuziaColuna3: { msg: 'Sequência de Números da Mesma Dúzia - Coluna 3rd', entrada: 'Coluna 1st e 2nd' },
    NumeroMesmaDuziaLinha1: { msg: 'Sequência de Números da Mesma Dúzia - Linha 1st', entrada: 'Linha 2nd e 3rd' },
    NumeroMesmaDuziaLinha2: { msg: 'Sequência de Números da Mesma Dúzia - Linha 2nd', entrada: 'Linha 1st e 3rd' },
    NumeroMesmaDuziaLinha3: { msg: 'Sequência de Números da Mesma Dúzia - Linha 3rd', entrada: 'Linha 1st e 2nd' },
}

const FREQUENCIA = {
    Seis: 6,
    Sete: 7,
    Oito: 8,
    Nove: 9,
    Dez: 10,
    Onze: 11,
    Doze: 12,
    Treze: 13,
    Catorze: 14,
    Quinze: 15,
    Dezesseis: 16,
}

const TIPO_MENSAGEM = {
    Analise: 'analise',
    Info: 'info',
    Falha: 'falha',
    Confirmacao: 'confirmacao',
    Gale: 'gale',
    Win: 'win',
    Erro: 'erro',
}

var nomeRoleta = '';

var frequenciaCorPreta = 0;
var ultimaFrequenciaCorPreta = 0;
var frequenciaCorVermelha = 0;
var ultimaFrequenciaCorVermelha = 0;
function SequenciaCor(numero) {
    let numeroValido = VerificarNumeroValido(numero);
    if (numeroValido != true) return numeroValido;

    let Vermelha = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    let preta = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

    if (Vermelha.includes(numero))
        frequenciaCorVermelha++;

    if (preta.includes(numero))
        frequenciaCorPreta++;

    let _frequenciaCorPreta = frequenciaCorPreta;
    let _frequenciaCorVermelha = frequenciaCorVermelha;

    let resultadoPreta = VerificarFrequenciaDose(frequenciaCorPreta, ESTRATEGIA.CorPreta);
    let resultadoVermelha = VerificarFrequenciaDose(frequenciaCorVermelha, ESTRATEGIA.CorVermelha);

    if (resultadoPreta?.tipo == TIPO_MENSAGEM.Falha || resultadoVermelha?.tipo == TIPO_MENSAGEM.Falha) {
        frequenciaCorPreta = 0;
        frequenciaCorVermelha = 0;
    }

    let tipo = TIPO_MENSAGEM.Info, msg = 'Analisando...';
    let ganhou = false;
    if (ultimaFrequenciaCorPreta != _frequenciaCorPreta) {
        tipo = resultadoPreta?.tipo ?? tipo;
        msg = resultadoPreta?.msg ?? msg;

        ganhou = VerificarSeGanhou(ultimaFrequenciaCorVermelha);
    }

    if (ultimaFrequenciaCorVermelha != _frequenciaCorVermelha) {
        tipo = resultadoVermelha?.tipo ?? tipo;
        msg = resultadoVermelha?.msg ?? msg;

        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaCorPreta);
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; }

    ultimaFrequenciaCorPreta = _frequenciaCorPreta;
    ultimaFrequenciaCorVermelha = _frequenciaCorVermelha;

    return {
        Preta: _frequenciaCorPreta,
        Vermelha: _frequenciaCorVermelha,
        Status: {
            tipo: tipo,
            msg: msg
        }
    };
}

var frequenciaNumeroPar = 0
var ultimaFrequenciaNumeroPar = 0
var frequenciaNumeroImpar = 0
var ultimaFrequenciaNumeroImpar = 0
function SequenciaNumeroParImpar(numero) {
    let numeroValido = VerificarNumeroValido(numero);
    if (numeroValido != true) return numeroValido;

    if (numero % 2 == 0)
        frequenciaNumeroPar++;
    else
        frequenciaNumeroImpar++;

    let _frequenciaNumeroPar = frequenciaNumeroPar;
    let _frequenciaNumeroImpar = frequenciaNumeroImpar;

    let resultadoPar = VerificarFrequenciaDose(frequenciaNumeroPar, ESTRATEGIA.NumeroPar);
    let resultadoImpar = VerificarFrequenciaDose(frequenciaNumeroImpar, ESTRATEGIA.NumeroImpar);

    if (resultadoPar?.tipo == TIPO_MENSAGEM.Falha || resultadoImpar?.tipo == TIPO_MENSAGEM.Falha) {
        frequenciaNumeroPar = 0;
        frequenciaNumeroImpar = 0;
    }

    var tipo = TIPO_MENSAGEM.Info, msg = 'Analisando...';
    let ganhou = false;
    if (ultimaFrequenciaNumeroPar != _frequenciaNumeroPar) {
        tipo = resultadoPar?.tipo ?? tipo;
        msg = resultadoPar?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaNumeroImpar);
    }

    if (ultimaFrequenciaNumeroImpar != _frequenciaNumeroImpar) {
        tipo = resultadoImpar?.tipo ?? tipo;
        msg = resultadoImpar?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaNumeroPar);
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; }

    ultimaFrequenciaNumeroPar = _frequenciaNumeroPar;
    ultimaFrequenciaNumeroImpar = _frequenciaNumeroImpar;

    return {
        Par: _frequenciaNumeroPar,
        Impar: _frequenciaNumeroImpar,
        Status: {
            tipo: tipo,
            msg: msg
        }
    };
}

var frequenciaNumeroBaixo = 0
var ultimaFrequenciaNumeroBaixo = 0
var frequenciaNumeroAlto = 0
var ultimaFrequenciaNumeroAlto = 0
function SequenciaNumeroBaixoAlto(numero) {
    let numeroValido = VerificarNumeroValido(numero);
    if (numeroValido != true) return numeroValido;

    let numerosBaixos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    let numerosAltos = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

    if (numerosBaixos.includes(numero))
        frequenciaNumeroBaixo++;

    if (numerosAltos.includes(numero))
        frequenciaNumeroAlto++;

    let _frequenciaNumeroBaixo = frequenciaNumeroBaixo;
    let _frequenciaNumeroAlto = frequenciaNumeroAlto;

    let resultadoNumeroBaixo = VerificarFrequenciaDose(frequenciaNumeroBaixo, ESTRATEGIA.NumeroBaixo);
    let resultadoNumeroAlto = VerificarFrequenciaDose(frequenciaNumeroAlto, ESTRATEGIA.NumeroAlto);

    if (resultadoNumeroBaixo?.tipo == TIPO_MENSAGEM.Falha || resultadoNumeroAlto?.tipo == TIPO_MENSAGEM.Falha) {
        frequenciaNumeroBaixo = 0;
        frequenciaNumeroAlto = 0;
    }

    var tipo = TIPO_MENSAGEM.Info, msg = 'Analisando...';
    let ganhou = false;
    if (ultimaFrequenciaNumeroBaixo != _frequenciaNumeroBaixo) {
        tipo = resultadoNumeroBaixo?.tipo ?? tipo;
        msg = resultadoNumeroBaixo?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaNumeroAlto);
    }

    if (ultimaFrequenciaNumeroAlto != _frequenciaNumeroAlto) {
        tipo = resultadoNumeroAlto?.tipo ?? tipo;
        msg = resultadoNumeroAlto?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaNumeroBaixo);
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; }

    ultimaFrequenciaNumeroBaixo = _frequenciaNumeroBaixo;
    ultimaFrequenciaNumeroAlto = _frequenciaNumeroAlto;

    return {
        NumeroBaixo: _frequenciaNumeroBaixo,
        NumeroAlto: _frequenciaNumeroAlto,
        Status: {
            tipo: tipo,
            msg: msg
        }
    };

}

var frequenciaPrimeiraDuziaColuna = 0
var ultimaFrequenciaPrimeiraDuziaColuna = 0
var frequenciaSegundaDuziaColuna = 0
var ultimaFrequenciaSegundaDuziaColuna = 0
var frequenciaTerceiraDuziaColuna = 0
var ultimaFrequenciaTerceiraDuziaColuna = 0
function SequenciaNumeroMesmaDuziaColuna(numero) {

    let numeroValido = VerificarNumeroValido(numero);
    if (numeroValido != true) return numeroValido;

    let primeiraDuzia = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let segundaDuzia = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    let terceiraDuzia = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

    if (primeiraDuzia.includes(numero))
        frequenciaPrimeiraDuziaColuna++;

    if (segundaDuzia.includes(numero))
        frequenciaSegundaDuziaColuna++;

    if (terceiraDuzia.includes(numero))
        frequenciaTerceiraDuziaColuna++;

    let _frequenciaPrimeiraDuziaColuna = frequenciaPrimeiraDuziaColuna;
    let _frequenciaSegundaDuziaColuna = frequenciaSegundaDuziaColuna;
    let _frequenciaTerceiraDuziaColuna = frequenciaTerceiraDuziaColuna;

    let resultadoColuna1 = VerificarFrequenciaSete(frequenciaPrimeiraDuziaColuna, ESTRATEGIA.NumeroMesmaDuziaColuna1);
    let resultadoColuna2 = VerificarFrequenciaSete(frequenciaSegundaDuziaColuna, ESTRATEGIA.NumeroMesmaDuziaColuna2);
    let resultadoColuna3 = VerificarFrequenciaSete(frequenciaTerceiraDuziaColuna, ESTRATEGIA.NumeroMesmaDuziaColuna3);

    if (resultadoColuna1?.tipo == TIPO_MENSAGEM.Falha || resultadoColuna2?.tipo == TIPO_MENSAGEM.Falha || resultadoColuna3?.tipo == TIPO_MENSAGEM.Falha) {
        frequenciaPrimeiraDuziaColuna = 0;
        frequenciaSegundaDuziaColuna = 0;
        frequenciaTerceiraDuziaColuna = 0;
    }

    let tipo = TIPO_MENSAGEM.Info, msg = 'Analisando...';
    let ganhou = false;
    if (ultimaFrequenciaPrimeiraDuziaColuna != _frequenciaPrimeiraDuziaColuna) {
        tipo = resultadoColuna1?.tipo ?? tipo;
        msg = resultadoColuna1?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaSegundaDuziaColuna, ultimaFrequenciaTerceiraDuziaColuna], 'sete');
    }

    if (ultimaFrequenciaSegundaDuziaColuna != _frequenciaSegundaDuziaColuna) {
        tipo = resultadoColuna2?.tipo ?? tipo;
        msg = resultadoColuna2?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaPrimeiraDuziaColuna, ultimaFrequenciaTerceiraDuziaColuna], 'sete');
    }

    if (ultimaFrequenciaTerceiraDuziaColuna != _frequenciaTerceiraDuziaColuna) {
        tipo = resultadoColuna3?.tipo ?? tipo;
        msg = resultadoColuna3?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaPrimeiraDuziaColuna, ultimaFrequenciaSegundaDuziaColuna], 'sete');
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; }

    ultimaFrequenciaPrimeiraDuziaColuna = _frequenciaPrimeiraDuziaColuna;
    ultimaFrequenciaSegundaDuziaColuna = _frequenciaSegundaDuziaColuna;
    ultimaFrequenciaTerceiraDuziaColuna = _frequenciaTerceiraDuziaColuna;

    return {
        Coluna1st: _frequenciaPrimeiraDuziaColuna,
        Coluna2nd: _frequenciaSegundaDuziaColuna,
        Coluna3rd: _frequenciaTerceiraDuziaColuna,
        Status: {
            tipo: tipo,
            msg: msg
        }
    };
}

var frequenciaPrimeiraDuziaLinha = 0
var ultimaFrequenciaPrimeiraDuziaLinha = 0
var frequenciaSegundaDuziaLinha = 0
var ultimaFrequenciaSegundaDuziaLinha = 0
var frequenciaTerceiraDuziaLinha = 0
var ultimaFrequenciaTerceiraDuziaLinha = 0
function SequenciaNumeroMesmaDuziaLinha(numero) {
    let numeroValido = VerificarNumeroValido(numero);
    if (numeroValido != true) return numeroValido;

    var primeiraDuzia = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
    var segundaDuzia = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
    var terceiraDuzia = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];

    if (primeiraDuzia.includes(numero))
        frequenciaPrimeiraDuziaLinha++;

    if (segundaDuzia.includes(numero))
        frequenciaSegundaDuziaLinha++;

    if (terceiraDuzia.includes(numero))
        frequenciaTerceiraDuziaLinha++;

    let _frequenciaPrimeiraDuziaLinha = frequenciaPrimeiraDuziaLinha;
    let _frequenciaSegundaDuziaLinha = frequenciaSegundaDuziaLinha;
    let _frequenciaTerceiraDuziaLinha = frequenciaTerceiraDuziaLinha;

    var resultadoLinha1 = VerificarFrequenciaSete(frequenciaPrimeiraDuziaLinha, ESTRATEGIA.NumeroMesmaDuziaLinha1);
    var resultadoLinha2 = VerificarFrequenciaSete(frequenciaSegundaDuziaLinha, ESTRATEGIA.NumeroMesmaDuziaLinha2);
    var resultadoLinha3 = VerificarFrequenciaSete(frequenciaTerceiraDuziaLinha, ESTRATEGIA.NumeroMesmaDuziaLinha3);

    if (resultadoLinha1?.tipo == TIPO_MENSAGEM.Falha || resultadoLinha2?.tipo == TIPO_MENSAGEM.Falha || resultadoLinha3?.tipo == TIPO_MENSAGEM.Falha) {
        frequenciaPrimeiraDuziaLinha = 0;
        frequenciaSegundaDuziaLinha = 0;
        frequenciaTerceiraDuziaLinha = 0;
    }

    var tipo = TIPO_MENSAGEM.Info, msg = 'Analisando...';
    let ganhou = false;
    if (ultimaFrequenciaPrimeiraDuziaLinha != _frequenciaPrimeiraDuziaLinha) {
        tipo = resultadoLinha1?.tipo ?? tipo;
        msg = resultadoLinha1?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaSegundaDuziaLinha, ultimaFrequenciaTerceiraDuziaLinha], 'sete');
    }

    if (ultimaFrequenciaSegundaDuziaLinha != _frequenciaSegundaDuziaLinha) {
        tipo = resultadoLinha2?.tipo ?? tipo;
        msg = resultadoLinha2?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaPrimeiraDuziaLinha, ultimaFrequenciaTerceiraDuziaLinha], 'sete');

    }

    if (ultimaFrequenciaTerceiraDuziaLinha != _frequenciaTerceiraDuziaLinha) {
        tipo = resultadoLinha3?.tipo ?? tipo;
        msg = resultadoLinha3?.msg ?? msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaPrimeiraDuziaLinha, ultimaFrequenciaSegundaDuziaLinha], 'sete');
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; }

    ultimaFrequenciaPrimeiraDuziaLinha = _frequenciaPrimeiraDuziaLinha;
    ultimaFrequenciaSegundaDuziaLinha = _frequenciaSegundaDuziaLinha;
    ultimaFrequenciaTerceiraDuziaLinha = _frequenciaTerceiraDuziaLinha;

    return {
        Linha1st: _frequenciaPrimeiraDuziaLinha,
        Linha2nd: _frequenciaSegundaDuziaLinha,
        Linha3rd: _frequenciaTerceiraDuziaLinha,
        Status: {
            tipo: tipo,
            msg: msg
        }
    };
}

function VerificarFrequenciaDose(totalFrequencia, estrategia) {
    switch (totalFrequencia) {
        case FREQUENCIA.Onze:
            return MensagemAnalisando(nomeRoleta, estrategia);
        case FREQUENCIA.Doze:
            return MensagemAnaliseConfirmada(nomeRoleta, estrategia);
        case FREQUENCIA.Treze:
            return MensagemAnaliseConfirmada(nomeRoleta, estrategia);
        case FREQUENCIA.Catorze:
            return MensagemGale(1);
        case FREQUENCIA.Quinze:
            return MensagemGale(2);
        case FREQUENCIA.Dezesseis:
            return MensagemFalha();
        default:
            return null;
    }
}

function VerificarFrequenciaSete(totalFrequencia, estrategia) {
    switch (totalFrequencia) {
        case FREQUENCIA.Seis:
            return MensagemAnalisando(nomeRoleta, estrategia);
        case FREQUENCIA.Sete:
            return MensagemAnaliseConfirmada(nomeRoleta, estrategia);
        case FREQUENCIA.Oito:
            return MensagemAnaliseConfirmada(nomeRoleta, estrategia);
        case FREQUENCIA.Nove:
            return MensagemGale(1);
        case FREQUENCIA.Dez:
            return MensagemGale(2);
        case FREQUENCIA.Onze:
            return MensagemFalha();
        default:
            return null;
    }
}

function VerificarSeGanhou(ultimaFrequencia, frequenciaGanha = 'dose') {
    if (frequenciaGanha != 'dose' && frequenciaGanha != 'sete')
        return { sucesso: false, erro: 'Frequência ganha inválido' };

    const FREQUENCIAS_GANHAS = {
        dose: [13, 14, 15],
        sete: [8, 9, 10],
    }

    let win = false;
    FREQUENCIAS_GANHAS[frequenciaGanha].forEach(valor => {
        if (Array.isArray(ultimaFrequencia)) {
            ultimaFrequencia.forEach(frequencia => {
                if (frequencia == valor) { win = true; return; }
            });
        } else {
            if (ultimaFrequencia == valor) { win = true; return; }
        }
    });

    return win ? MensagemWin() : false;
}

function VerificarNumeroValido(numero) {
    if (isNaN(numero))
        return { Status: { tipo: TIPO_MENSAGEM.Erro, msg: `O valor inserido não é um número.. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` } };

    if (numero < NUMERO_MININO && numero > NUMERO_MAXIMO)
        return { Status: { tipo: TIPO_MENSAGEM.Erro, msg: `Número inválido. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` } };

    return true;
}

function MensagemAnalisando(roleta, estarategia) {
    return {
        tipo: TIPO_MENSAGEM.Analise,
        msg: `ANALIZANDO \n\nRoleta: ${roleta} \n\nEstaratégia: ${estarategia.msg} \n\nEntrar quando confirmar`
    }
}

function MensagemAnaliseConfirmada(roleta, estarategia) {
    return {
        tipo: TIPO_MENSAGEM.Confirmacao,
        msg: `ANÁLISE CONFIRMADA\n\nRoleta: ${roleta} \n\nEstaratégia: ${estarategia.msg} \n\nEntrar: ${estarategia.entrada}`
    }
}

function MensagemGale(numero) {
    return {
        tipo: TIPO_MENSAGEM.Gale,
        msg: `Fazer gale ${numero}`
    };
}

function MensagemWin() {
    return {
        tipo: TIPO_MENSAGEM.Win,
        msg: `WIN`
    };
}

function MensagemFalha() {
    return {
        tipo: TIPO_MENSAGEM.Falha,
        msg: `RED`
    };
}

var ultimaEstrategia = '';
function AnalisarTodasRegras(valor, roleta = '') {
    nomeRoleta = roleta;

    let cor = SequenciaCor(valor);
    let parImpar = SequenciaNumeroParImpar(valor);
    let baixoAlto = SequenciaNumeroBaixoAlto(valor);
    let duziaColuna = SequenciaNumeroMesmaDuziaColuna(valor);
    let duziaLinha = SequenciaNumeroMesmaDuziaLinha(valor);

    let tipo = TIPO_MENSAGEM.Info, msg = 'Analisando...';
    let status = [];
    let win = false;

    if (cor.Status?.tipo && cor.Status?.tipo != TIPO_MENSAGEM.Analise) {
        tipo = cor.Status?.tipo;
        msg = cor.Status?.msg;
        status.push(cor.Status);
    }

    if (parImpar?.Status?.tipo && parImpar?.Status?.tipo != TIPO_MENSAGEM.Analise) {
        tipo = parImpar?.Status?.tipo;
        msg = parImpar?.Status?.msg;
    }

    if (baixoAlto?.Status?.tipo && baixoAlto?.Status?.tipo != TIPO_MENSAGEM.Analise) {
        tipo = baixoAlto?.Status?.tipo;
        msg = baixoAlto?.Status?.msg;
    }

    if (duziaColuna?.Status?.tipo && duziaColuna?.Status?.tipo != TIPO_MENSAGEM.Analise) {
        tipo = duziaColuna?.Status?.tipo;
        msg = duziaColuna?.Status?.msg;
    }

    if (duziaLinha?.Status?.tipo && duziaLinha?.Status?.tipo != TIPO_MENSAGEM.Analise) {
        tipo = duziaLinha?.Status?.tipo;
        msg = duziaLinha?.Status?.msg;
    }

    let resultado = {
        Frequencias: {
            Cor: {
                Preta: cor.Preta,
                Vermelha: cor.Vermelha,
                Status: cor.Status
            },
            ParImpar: {
                Par: parImpar.Par,
                Impar: parImpar.Impar,
                Status: parImpar.Status
            },
            BaixoAlto: {
                NumeroBaixo: baixoAlto.NumeroBaixo,
                NumeroAlto: baixoAlto.NumeroAlto,
                Status: baixoAlto.Status
            },
            DuziaColuna: {
                Coluna1st: duziaColuna.Coluna1st,
                Coluna2nd: duziaColuna.Coluna2nd,
                Coluna3rd: duziaColuna.Coluna3rd,
                Status: duziaColuna.Status
            },
            DuziaLinha: {
                Linha1st: duziaLinha.Linha1st,
                Linha2nd: duziaLinha.Linha2nd,
                Linha3rd: duziaLinha.Linha3rd,
                Status: duziaLinha.Status
            }
        },
        Status: {
            tipo: tipo,
            msg: msg
        }
    }

    if (tipo == TIPO_MENSAGEM.Win) Restart();

    return resultado;
}

function Restart() {
    frequenciaCorPreta = 0;
    frequenciaCorVermelha = 0;
    frequenciaNumeroPar = 0;
    frequenciaNumeroImpar = 0;
    frequenciaNumeroBaixo = 0;
    frequenciaNumeroAlto = 0;
    frequenciaPrimeiraDuziaColuna = 0;
    frequenciaSegundaDuziaColuna = 0;
    frequenciaTerceiraDuziaColuna = 0;
    frequenciaPrimeiraDuziaLinha = 0;
    frequenciaSegundaDuziaLinha = 0;
    frequenciaTerceiraDuziaLinha = 0;
}

class Regras {
    constructor(roleta = '') {
        Restart();

        nomeRoleta = roleta;
    }

    AnalisarTodasRegras(valor) { return AnalisarTodasRegras(valor, nomeRoleta); }
    SequenciaCor(cor) { return SequenciaCor(cor); }
    SequenciaNumeroParImpar(numero) { return SequenciaNumeroParImpar(numero); }
    SequenciaNumeroBaixoAlto(numero) { return SequenciaNumeroBaixoAlto(numero); }
    SequenciaNumeroMesmaDuziaColuna(numero) { return SequenciaNumeroMesmaDuziaColuna(numero); }
    SequenciaNumeroMesmaDuziaLinha(numero) { return SequenciaNumeroMesmaDuziaLinha(numero); }
}

export default {
    SequenciaCor,
    SequenciaNumeroParImpar,
    SequenciaNumeroBaixoAlto,
    SequenciaNumeroMesmaDuziaColuna,
    SequenciaNumeroMesmaDuziaLinha,
    AnalisarTodasRegras,
    Restart,
    MensagemAnalisando,
    MensagemAnaliseConfirmada,
    MensagemFalha,
    Regras: new Regras(),
}