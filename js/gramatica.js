function addTable(primeiro,segundo){
    var tb = document.getElementById("tbGramatica");
    var qdtLinhas = tb.rows.length;
    var linha = tb.insertRow(qdtLinhas);

    var cellCodigo = linha.insertCell(0);
    var cellPrimeiro = linha.insertCell(1);
    var cellSegundo = linha.insertCell(2);

    cellCodigo.innerHTML = qdtLinhas;
    cellPrimeiro.innerHTML = primeiro;
    cellSegundo.innerHTML = segundo;
}

const btn = document.getElementById("send");

btn.addEventListener("click", function (e) {
    e.preventDefault();
    const primeiro = document.getElementById("primeiro");
    const segundo = document.getElementById("segundo");

    addTable(primeiro.value,segundo.value)
    
});
