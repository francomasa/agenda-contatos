const form = document.getElementById('form-contatos');
const nomesContatos = [];
const telefoneContato = [];

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    actualizaTabela();
});

function adicionaLinha(){
    const inputNomeContato = document.getElementById('nome-contato');
    const inputTelefoneContato = document.getElementById('telefone-contato');
    
    if(nomesContatos.includes(inputNomeContato.value) || telefoneContato.includes(inputTelefoneContato.value)){
        let contatoRepetido = `O contato ${inputNomeContato.value} com o numero ${inputTelefoneContato.value} já existe`;
        document.getElementById('error').innerHTML = contatoRepetido;
    }
    else{
        if(!telefone_validation(`${inputTelefoneContato.value}`)){
            let errorMessage = '';
            errorMessage = `O telefone ${inputTelefoneContato.value} no é valido`;
            document.getElementById('error').innerHTML = errorMessage;
        }
        else{
            document.getElementById('error').innerHTML = '';
            nomesContatos.push(inputNomeContato.value);
            telefoneContato.push(inputTelefoneContato.value);

            let linha = `<tr>`;
            linha += `<td>${inputNomeContato.value}</td>`;
            linha += `<td>${inputTelefoneContato.value}</td>`;
            linha += `</tr>`;

            linhas += linha;
        }
    }
    inputTelefoneContato.value = '';
    inputNomeContato.value = '';
    inputNomeContato.focus();
}

function actualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function telefone_validation(telefone) {
    //retira todos os caracteres menos os numeros
    telefone = telefone.replace(/\D/g, '');

    //verifica se tem a qtde de numero correto
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    //Se tiver 11 caracteres, verificar se começa com 9 o celular
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

    //verifica se não é nenhum numero digitado errado (propositalmente)
    for (var n = 0; n < 10; n++) {
        //um for de 0 a 9.
        //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
        //caractere a ser repetido
        var temp = telefone.substring(2);
        if (temp == new Array(9).join(n.toString()) || temp == new Array(10).join(n.toString()) ) return false; 
    }
    //DDDs validos
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

    //  E por ultimo verificar se o numero é realmente válido. Até 2016 um celular pode
    //ter 8 caracteres, após isso somente numeros de telefone e radios (ex. Nextel)
    //vão poder ter numeros de 8 digitos (fora o DDD), então esta função ficará inativa
    //até o fim de 2016, e se a ANATEL realmente cumprir o combinado, os numeros serão
    //validados corretamente após esse período.
    //NÃO ADICIONEI A VALIDAÇÂO DE QUAIS ESTADOS TEM NONO DIGITO, PQ DEPOIS DE 2016 ISSO NÃO FARÁ DIFERENÇA
    //Não se preocupe, o código irá ativar e desativar esta opção automaticamente.
    //Caso queira, em 2017, é só tirar o if.
    if (new Date().getFullYear() < 2017) return true;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    //se passar por todas as validações acima, então está tudo certo
    return true;
}