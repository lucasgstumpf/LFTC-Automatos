const btn = document.querySelector("#send");

var resposta = document.querySelector("#resultado");

btn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.querySelector("#inputRegex");
    const name2 = document.querySelector("#inputEntrada");

    const regex = name.value;

    const texto = name2.value;

    console.log(regex, texto);

    const re = new RegExp(regex);
    if (re.test(texto) && regex.charAt(0) == '^' && regex.substr(-1) == '$') {
        console.log("Entrou no if")
        name2.style.backgroundColor = "green";
        return;
    }
    else {
        name2.style.backgroundColor = "red"
    }
});

