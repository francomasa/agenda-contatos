const form = document.getElementById('form-atividade');
const imgAprovado = `<img src="./images/aprovado.png" alt="aprovado" />`;
const imgReprovado = `<img src="./images/reprovado.png" alt="reprovado" />`;
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = parseFloat(prompt('Digite a nota minima:'));
if(notaMinima < 0 || notaMinima >10){
    const notaMinima = parseFloat(prompt('Digite a nota minima(entre 0 e 10):'));
}
let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    actualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    
    if(atividades.includes(inputNomeAtividade.value)){
        alert(`A actividade ${inputNomeAtividade.value} ya fue inserida`);
    }
    else{
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = `<tr>`;
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`;

        linhas += linha;
    }
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function actualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();
    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal(){
    let somasDasNotas = 0;
    for(let i = 0; i < notas.length; i++){
        somasDasNotas += notas[i];
    }
    const media = somasDasNotas/notas.length;
    return media;
}