


const btnTeste = document.querySelector("#sendTeste");

btnTeste.addEventListener("click", function (e) {
    e.preventDefault();

    var inputArea = document.getElementById("inputArea");
    var inputAreaTxt = inputArea.value;
    inputAreaTxt = inputAreaTxt.replace(/([A-Z])/g, ' $1');
    inputAreaTxt = inputAreaTxt.split("\n");
    console.log(inputAreaTxt);

    var inputTeste = document.getElementById("inputTeste");
    let token = inputTeste.value.split('');
    

    // biblioteca de gramática
    try {
        var gramatica = new tinynlp.Grammar(inputAreaTxt);
        inputArea.style.backgroundColor = "white"
      } catch (error) {
        console.error(error);
        inputArea.style.backgroundColor = "red"
      }

    // definindo a raiz
    const raiz = inputAreaTxt[0][1]

    // contruindo o analizador
    let saida = tinynlp.parse(
        token,
        gramatica,
        raiz
    );

    // análise finalizadas
    let estado = saida.getFinishedRoot(raiz);

    if (estado) {
        console.log("Entrou no if")
        inputTeste.style.backgroundColor = "green";
        return;
    }
    else {
        inputTeste.style.backgroundColor = "red"
    }

});