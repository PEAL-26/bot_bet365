const NUMERO_MININO = 1;
const NUMERO_MAXIMO = 36;

const ESTRATEGIA = {
    CorPreta: { msg: 'Sequência de Pretos', entrada: 'Vermelho' },
    CorVermelha: { msg: 'Sequência de Vermelhos', entrada: 'Preto' },
    NumeroPar: { msg: 'Sequência de Números Pares', entrada: 'Ímpar' },
    NumeroImpar: { msg: 'Sequência de Números Ímpares', entrada: 'Par' },
    NumeroBaixo: { msg: 'Sequência de Números Baixos', entrada: 'Alto' },
    NumeroAlto: { msg: 'Sequência de Números Altos', entrada: 'Baixo' },
    NumeroMesmaDuziaColuna1: { msg: 'Sequência de Números da Mesma Dúzia - Coluna 1st', entrada: 'Coluna 2nd ou 3rd' },
    NumeroMesmaDuziaColuna2: { msg: 'Sequência de Números da Mesma Dúzia - Coluna 2nd', entrada: 'Coluna 1st ou 3rd' },
    NumeroMesmaDuziaColuna3: { msg: 'Sequência de Números da Mesma Dúzia - Coluna 3rd', entrada: 'Coluna 1st ou 2nd' },
    NumeroMesmaDuziaLinha1: { msg: 'Sequência de Números da Mesma Dúzia - Linha 1st', entrada: 'Linha 2nd ou 3rd' },
    NumeroMesmaDuziaLinha2: { msg: 'Sequência de Números da Mesma Dúzia - Linha 2nd', entrada: 'Linha 1st ou 3rd' },
    NumeroMesmaDuziaLinha3: { msg: 'Sequência de Números da Mesma Dúzia - Linha 3rd', entrada: 'Linha 1st ou 2nd' },
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
    Confirmacao: 'successo',
    Gale: 'gale',
    Win: 'win'
}

var nomeRoleta = '';

var frequenciaCorPreta = 0;
var ultimaFrequenciaCorPreta = 0;
var frequenciaCorVermelha = 0;
var ultimaFrequenciaCorVermelha = 0;
function SequenciaCor(cor) {
    if (!isNaN(cor))
        return { Preta: frequenciaCorPreta, Vermelha: frequenciaCorVermelha };

    let _cor = cor.toLowerCase()
    if (_cor != 'vermelha' && _cor != 'preta')
        return { sucesso: false, erro: 'Cor inválida.[vermelha|preta]' };

    if (_cor == 'vermelha')
        frequenciaCorVermelha++;

    if (_cor == 'preta')
        frequenciaCorPreta++;

    let _frequenciaCorPreta = frequenciaCorPreta;
    let _frequenciaCorVermelha = frequenciaCorVermelha;

    let resultadoPreta = VerificarFrequenciaDose(frequenciaCorPreta, ESTRATEGIA.CorPreta);
    let resultadoVermelha = VerificarFrequenciaDose(frequenciaCorVermelha, ESTRATEGIA.CorVermelha);

    if (resultadoPreta?.tipo == TIPO_MENSAGEM.Falha || resultadoVermelha?.tipo == TIPO_MENSAGEM.Falha) {
        frequenciaCorPreta = 0;
        frequenciaCorVermelha = 0;
    }

    var tipo = '', msg = '';
    let ganhou = false;
    if (ultimaFrequenciaCorPreta != _frequenciaCorPreta) {
        tipo = resultadoPreta?.tipo;
        msg = resultadoPreta?.msg;

        ganhou = VerificarSeGanhou(ultimaFrequenciaCorVermelha);
    }

    if (ultimaFrequenciaCorVermelha != _frequenciaCorVermelha) {
        tipo = resultadoVermelha?.tipo;
        msg = resultadoVermelha?.msg;

        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaCorPreta);
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; Restart(); }

    ultimaFrequenciaCorPreta = _frequenciaCorPreta;
    ultimaFrequenciaCorVermelha = _frequenciaCorVermelha;

    return {
        Preta: _frequenciaCorPreta,
        Vermelha: _frequenciaCorVermelha,
        Mensagem: {
            tipo: tipo ?? TIPO_MENSAGEM.Info,
            msg: tipo ? msg : 'Analisando...'
        }
    };
}

var frequenciaNumeroPar = 0
var ultimaFrequenciaNumeroPar = 0
var frequenciaNumeroImpar = 0
var ultimaFrequenciaNumeroImpar = 0
function SequenciaNumeroParImpar(numero) {
    if (isNaN(numero))
        return { sucesso: false, erro: `O valor inserido não é um número.. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` };

    if (numero < NUMERO_MININO && numero > NUMERO_MAXIMO)
        return { sucesso: false, erro: `Número inválido. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` };

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

    let tipo = '', msg = '';
    let ganhou = false;
    if (ultimaFrequenciaNumeroPar != _frequenciaNumeroPar) {
        tipo = resultadoPar?.tipo;
        msg = resultadoPar?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaNumeroImpar);
    }

    if (ultimaFrequenciaNumeroImpar != _frequenciaNumeroImpar) {
        tipo = resultadoImpar?.tipo;
        msg = resultadoImpar?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaNumeroPar);
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; Restart(); }

    ultimaFrequenciaNumeroPar = _frequenciaNumeroPar;
    ultimaFrequenciaNumeroImpar = _frequenciaNumeroImpar;

    return {
        Par: _frequenciaNumeroPar,
        Impar: _frequenciaNumeroImpar,
        Mensagem: {
            tipo: tipo ?? TIPO_MENSAGEM.Info,
            msg: tipo ? msg : 'Analisando...'
        }
    };
}

var frequenciaNumeroBaixo = 0
var ultimaFrequenciaNumeroBaixo = 0
var frequenciaNumeroAlto = 0
var ultimaFrequenciaNumeroAlto = 0
function SequenciaNumeroBaixoAlto(numero) {
    if (isNaN(numero))
        return { sucesso: false, erro: `O valor inserido não é um número.. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` };

    if (numero < NUMERO_MININO && numero > NUMERO_MAXIMO)
        return { sucesso: false, erro: `Número inválido. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` };

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

    let tipo = '', msg = '';
    let ganhou = false;
    if (ultimaFrequenciaNumeroBaixo != _frequenciaNumeroBaixo) {
        tipo = resultadoNumeroBaixo?.tipo;
        msg = resultadoNumeroBaixo?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaNumeroAlto);
    }

    if (ultimaFrequenciaNumeroAlto != _frequenciaNumeroAlto) {
        tipo = resultadoNumeroAlto?.tipo;
        msg = resultadoNumeroAlto?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou(ultimaFrequenciaNumeroBaixo);
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; Restart(); }

    ultimaFrequenciaNumeroBaixo = _frequenciaNumeroBaixo;
    ultimaFrequenciaNumeroAlto = _frequenciaNumeroAlto;

    return {
        NumeroBaixo: _frequenciaNumeroBaixo,
        NumeroAlto: _frequenciaNumeroAlto,
        Mensagem: {
            tipo: tipo ?? TIPO_MENSAGEM.Info,
            msg: tipo ? msg : 'Analisando...'
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
    if (isNaN(numero))
        return { sucesso: false, erro: `O valor inserido não é um número.. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` };

    if (numero < NUMERO_MININO && numero > NUMERO_MAXIMO)
        return { sucesso: false, erro: `Número inválido. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` };

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
        tipo = resultadoColuna1?.tipo;
        msg = resultadoColuna1?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaSegundaDuziaColuna, ultimaFrequenciaTerceiraDuziaColuna], 'sete');
    }

    if (ultimaFrequenciaSegundaDuziaColuna != _frequenciaSegundaDuziaColuna) {
        tipo = resultadoColuna2?.tipo;
        msg = resultadoColuna2?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaPrimeiraDuziaColuna, ultimaFrequenciaTerceiraDuziaColuna], 'sete');
    }

    if (ultimaFrequenciaTerceiraDuziaColuna != _frequenciaTerceiraDuziaColuna) {
        tipo = resultadoColuna3?.tipo;
        msg = resultadoColuna3?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaPrimeiraDuziaColuna, ultimaFrequenciaSegundaDuziaColuna], 'sete');
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; Restart(); }

    ultimaFrequenciaPrimeiraDuziaColuna = _frequenciaPrimeiraDuziaColuna;
    ultimaFrequenciaSegundaDuziaColuna = _frequenciaSegundaDuziaColuna;
    ultimaFrequenciaTerceiraDuziaColuna = _frequenciaTerceiraDuziaColuna;

    return {
        Coluna1st: _frequenciaPrimeiraDuziaColuna,
        Coluna2nd: _frequenciaSegundaDuziaColuna,
        Coluna3rd: _frequenciaTerceiraDuziaColuna,
        Mensagem: {
            tipo: tipo ?? TIPO_MENSAGEM.Info,
            msg: tipo ? msg : 'Analisando...'
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
    if (isNaN(numero))
        return { sucesso: false, erro: `O valor inserido não é um número.. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` };

    if (numero < NUMERO_MININO && numero > NUMERO_MAXIMO)
        return { sucesso: false, erro: `Número inválido. [${NUMERO_MININO}...${NUMERO_MAXIMO}]` };

    var primeiraDuzia = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
    var segundaDuzia = [1, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
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

    let tipo = '', msg = '';
    let ganhou = false;
    if (ultimaFrequenciaPrimeiraDuziaLinha != _frequenciaPrimeiraDuziaLinha) {
        tipo = resultadoLinha1?.tipo;
        msg = resultadoLinha1?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaSegundaDuziaLinha, ultimaFrequenciaTerceiraDuziaLinha], 'sete');
    }

    if (ultimaFrequenciaSegundaDuziaLinha != _frequenciaSegundaDuziaLinha) {
        tipo = resultadoLinha2?.tipo;
        msg = resultadoLinha2?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaPrimeiraDuziaLinha, ultimaFrequenciaTerceiraDuziaLinha], 'sete');

    }

    if (ultimaFrequenciaTerceiraDuziaLinha != _frequenciaTerceiraDuziaLinha) {
        tipo = resultadoLinha3?.tipo;
        msg = resultadoLinha3?.msg;
        if (!ganhou) ganhou = VerificarSeGanhou([ultimaFrequenciaPrimeiraDuziaLinha, ultimaFrequenciaSegundaDuziaLinha], 'sete');
    }

    if (ganhou) { tipo = ganhou.tipo; msg = ganhou.msg; Restart(); }

    ultimaFrequenciaPrimeiraDuziaLinha = _frequenciaPrimeiraDuziaLinha;
    ultimaFrequenciaSegundaDuziaLinha = _frequenciaSegundaDuziaLinha;
    ultimaFrequenciaTerceiraDuziaLinha = _frequenciaTerceiraDuziaLinha;

    return {
        Linha1st: _frequenciaPrimeiraDuziaLinha,
        Linha2nd: _frequenciaSegundaDuziaLinha,
        Linha3rd: _frequenciaTerceiraDuziaLinha,
        Mensagem: {
            tipo: tipo ?? TIPO_MENSAGEM.Info,
            msg: tipo ? msg : 'Analisando...'
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

function AnalisarTodasRegras(valor, roleta = '') {
    nomeRoleta = roleta;

    let cor = SequenciaCor(valor);
    let parImpar = SequenciaNumeroParImpar(valor);
    let baixoAlto = SequenciaNumeroBaixoAlto(valor);
    let duziaColuna = SequenciaNumeroMesmaDuziaColuna(valor);
    let duziaLinha = SequenciaNumeroMesmaDuziaLinha(valor);
    let tipo = TIPO_MENSAGEM.Info, msg = 'Analisando...';

    if (cor.Mensagem?.tipo && cor.Mensagem?.tipo != TIPO_MENSAGEM.Info) {
        tipo = cor.Mensagem?.tipo;
        msg = cor.Mensagem?.msg;
    }

    if (parImpar?.Mensagem?.tipo && parImpar?.Mensagem?.tipo != TIPO_MENSAGEM.Info) {
        tipo = parImpar?.Mensagem?.tipo;
        msg = parImpar?.Mensagem?.msg;
    }

    if (baixoAlto?.Mensagem?.tipo && baixoAlto?.Mensagem?.tipo != TIPO_MENSAGEM.Info) {
        tipo = baixoAlto?.Mensagem?.tipo;
        msg = baixoAlto?.Mensagem?.msg;
    }

    if (duziaColuna?.Mensagem?.tipo && duziaColuna?.Mensagem?.tipo != TIPO_MENSAGEM.Info) {
        tipo = duziaColuna?.Mensagem?.tipo;
        msg = duziaColuna?.Mensagem?.msg;
    }

    if (duziaLinha?.Mensagem?.tipo && duziaLinha?.Mensagem?.tipo != TIPO_MENSAGEM.Info) {
        tipo = duziaLinha?.Mensagem?.tipo;
        msg = duziaLinha?.Mensagem?.msg;
    }

    return {
        Frequencias: {
            Cor: {
                Preta: frequenciaCorPreta,
                vermelha: frequenciaCorVermelha
            },
            ParImpar: {
                Par: frequenciaNumeroPar,
                Impar: frequenciaNumeroImpar
            },
            BaixoAlto: {
                NumeroBaixo: frequenciaNumeroBaixo,
                NumeroAlto: frequenciaNumeroAlto
            },
            DuziaColuna: {
                Coluna1st: frequenciaPrimeiraDuziaColuna,
                Coluna2nd: frequenciaSegundaDuziaColuna,
                Coluna3rd: frequenciaTerceiraDuziaColuna
            },
            DuziaLinha: {
                Linha1st: frequenciaPrimeiraDuziaLinha,
                Linha2nd: frequenciaSegundaDuziaLinha,
                Linha3rd: frequenciaTerceiraDuziaLinha
            }
        },
        Mensagem: {
            tipo: tipo,
            msg: msg
        }
    }
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

module.exports = {
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
    Regras
}