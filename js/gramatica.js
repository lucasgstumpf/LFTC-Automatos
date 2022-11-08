


const btnTeste = document.querySelector("#sendTeste");


//Função é chamada quando o botão é clicado
btnTeste.addEventListener("click", function (e) {
    e.preventDefault();

    //Inputs e tratamentos de erros
    var inputArea = document.getElementById("inputArea");
    var inputAreaTxt = inputArea.value;
    inputAreaTxt = inputAreaTxt.replace(/([A-Z])/g, ' $1');
    inputAreaTxt = inputAreaTxt.split("\n");
    console.log(inputAreaTxt);
    var inputTeste = document.getElementById("inputTeste");
    let teste = inputTeste.value.split('');


    //Função que valida a gramatica do input, o parametro é a gramatica em si em formato de array.
    try {
        var gramatica = new tinynlp.Grammar(inputAreaTxt);
        inputArea.style.backgroundColor = "white"
    } catch (error) {
        console.error(error);
        inputArea.style.backgroundColor = "red"
    }

    const inicio = inputAreaTxt[0][1]

    //Função que valida o teste do input, nesta função os parametros são os Tokens(Array),a gramatica, e o inicio da gramatica, que é dado pela primeira letra.
    let saida = tinynlp.parse(
        teste,
        gramatica,
        inicio
    );

    let validacao = saida.getFinishedRoot(inicio);

    if (validacao) {
        inputTeste.style.backgroundColor = "green";
    }
    else {
        inputTeste.style.backgroundColor = "red"
    }

});