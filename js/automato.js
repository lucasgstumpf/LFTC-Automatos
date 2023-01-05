var addState = () => {
  nodes.add({
    id: ids,
    label: "Q" + ids,
    initial: false,
    final: false,
  });

  ids++;
};

var addEdge = (from, to, value) => {
  edges.add({
    from: from,
    to: to,
    label: value,
  });

};

var deleteEdgeMode = () => {
  network.deleteSelected();
};

var setInitial = () => {
  let selectedNodes = network.getSelectedNodes();

  if (initial == -1) {
    nodes.update({
      id: selectedNodes[0],
      initial: true,
      color: {
        background: "#2783ff",
      },
    });

    initial = selectedNodes[0];
  }

};

var setFinal = () => {
  let selectedNodes = network.getSelectedNodes();

  nodes.update({
    id: selectedNodes[0],
    final: true,
    color: {
      border: "#000",
    },
  });

  if (finalStates.indexOf(selectedNodes[0]) == -1) {
    finalStates.push(selectedNodes[0]);
  }

};

var addEdgeInTheNetwork = () => {
  let from = prompt(
    "Digite o Estado de origem: \nObs: Digite apenas o número do estado."
  );
  let to = prompt(
    "Digite o Estado de destino: \nObs: Digite apenas o número do estado."
  );
  let value = prompt("Digite o valor: ");

  let estados = Object.keys(network.getPositions());
  if(from in estados && to in estados)
    addEdge(from, to, value);
};

// create an array with nodes
var nodes = new vis.DataSet();

// create an array with edges
var edges = new vis.DataSet();

// create a network
var container = document.getElementById("mynetwork");

let initial = -1;
let finalStates = [];
var ids = 0;

// provide the data in the vis format
var data = {
  nodes: nodes,
  edges: edges,
};

var options = {
  edges: {
    arrows: {
      to: {
        enabled: true,
        type: "arrow",
      },
    },
  },
  physics: {
    enabled: false,
  },
};

var network = new vis.Network(container, data, options);

const afd = {
  estados: [],
  alfabeto: [],
  estadoInicial: "",
  estadosFinais: [],
  regrasDeTransicao: {},
};

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    validar();
});

function validar(){
    setAFD();
    var cadeia = document.getElementById("validarText").value;
    var automatoStatus = document.getElementById("automatoStatus");

    if(validaAFD(cadeia, afd) || validaAFND(cadeia, afd)){
        automatoStatus.className = 'automatoStatus success';
        automatoStatus.innerHTML = 'A cadeia foi aceita pelo autômato';
    }else{
        automatoStatus.className = 'automatoStatus fail';
        automatoStatus.innerHTML = 'A cadeia não foi aceita pelo autômato';
    }
    
}

function setAFD() {
  afd.estados = Object.keys(network.getPositions());
  afd.estadoInicial = String(initial);
  afd.estadosFinais = finalStates.map((x) => String(x));
  const edgesActual = edges.get();
  const getAlphabet = edgesActual.map((obj) => obj.label);
  afd.alfabeto = getAlphabet.filter((x, i) => getAlphabet.indexOf(x) === i);

  edgesActual.forEach(function (objeto) {
    if (!afd.regrasDeTransicao.hasOwnProperty(objeto.from)) {
      afd.regrasDeTransicao[objeto.from] = {};
    }
    if (!afd.regrasDeTransicao[objeto.from].hasOwnProperty(objeto.label)) {
      afd.regrasDeTransicao[objeto.from][objeto.label] = [];
    }
    if(!afd.regrasDeTransicao[objeto.from][objeto.label].includes(objeto.to))
        afd.regrasDeTransicao[objeto.from][objeto.label].push(objeto.to);
  });

}

function validaAFD(entrada, afd) {
  // Obtém os parâmetros do AFD
  const alfabeto = afd.alfabeto;
  const estadoInicial = afd.estadoInicial;
  const estadosFinais = afd.estadosFinais;
  const regrasDeTransicao = afd.regrasDeTransicao;

  // Inicializa o autômato no estado inicial
  let estadoAtual = estadoInicial;

  // Itera sobre cada símbolo da entrada
  for (const simbolo of entrada) {
    // Verifica se o símbolo pertence ao alfabeto do AFD
    if (!alfabeto.includes(simbolo)) {
      // Se o símbolo não pertence ao alfabeto, a entrada é inválida
      return false;
    }

    // Executa a transição do autômato de acordo com as regras de transição
    if(regrasDeTransicao[estadoAtual] !== undefined){
        if(regrasDeTransicao[estadoAtual][simbolo] !== undefined)
            estadoAtual = regrasDeTransicao[estadoAtual][simbolo];
        else
            return false;
    } else return false;
    
  }

  // Verifica se o autômato chegou a um estado final após a leitura da entrada
  console.log("Estados finais", estadosFinais)
  console.log("Estado", estadoAtual)
  return estadosFinais.includes(estadoAtual[0]);
}

function validaAFND(entrada, afn) {
    // Obtém os parâmetros do AFN
    const alfabeto = afn.alfabeto;
    const estadoInicial = afn.estadoInicial;
    const estadosFinais = afn.estadosFinais;
    const regrasDeTransicao = afn.regrasDeTransicao;
  
    // Inicializa o conjunto de estados atuais com o estado inicial do AFN
    let estadosAtuais = new Set([estadoInicial]);
  
    // Itera sobre cada símbolo da entrada
    for (const simbolo of entrada) {
      // Verifica se o símbolo pertence ao alfabeto do AFN
      if (!alfabeto.includes(simbolo)) {
        // Se o símbolo não pertence ao alfabeto, a entrada é inválida
        return false;
      }
  
      // Cria um novo conjunto de estados atuais vazio
      let novosEstadosAtuais = new Set();
  
      // Para cada estado atual e cada símbolo da entrada, adiciona todos os estados
      // que podem ser alcançados a partir do estado atual lendo o símbolo atual para o
      // conjunto de novos estados atuais
      for (const estadoAtual of estadosAtuais) {
        for (const transicao of regrasDeTransicao[estadoAtual][simbolo] || []) {
          novosEstadosAtuais.add(transicao);
        }
      }
  
      // Atualiza o conjunto de estados atuais
      estadosAtuais = novosEstadosAtuais;
    }
  
    // Verifica se o conjunto de estados atuais inclui algum estado final do AFN
    for (const estadoAtual of estadosAtuais) {
      if (estadosFinais.includes(estadoAtual)) {
        return true;
      }
    }
  
    return false;
  }
