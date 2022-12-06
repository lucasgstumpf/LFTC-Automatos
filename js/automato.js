var addState = () => {
    nodes.add({
        id: ids,  
        label: 'Q' + ids,
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
    })
};

var deleteEdgeMode = () => {
    network.deleteSelected();
}

var setInitial = () => {
    let selectedNodes = network.getSelectedNodes();

    if(initial == -1){
        nodes.update({
            id: selectedNodes[0], 
            initial: true, 
            color:{
                background: '#2783ff'
            } 
        });

        initial = selectedNodes[0];
    }
    
    console.log(initial);
}

var setFinal = () => {
    let selectedNodes = network.getSelectedNodes();

    nodes.update({
        id: selectedNodes[0], 
        final: true, 
        color:{
            border: '#000'
        }
    });

    if(finalStates.indexOf(selectedNodes[0]) == -1){
        finalStates.push(selectedNodes[0]);
    }

    console.log(finalStates);

}

var addEdgeInTheNetwork = () => {
    let from = prompt("Digite o Estado de origem: \nObs: Digite apenas o número do estado.");
    let to = prompt("Digite o Estado de destino: \nObs: Digite apenas o número do estado.");
    let value = prompt("Digite o valor: ");
    addEdge(from, to, value);
}

// create an array with nodes
var nodes = new vis.DataSet();
// addState(8,'node 8')
// create an array with edges
var edges = new vis.DataSet();

// create a network
var container = document.getElementById('mynetwork');

let initial = -1;
let finalStates = [];
var ids = 0;

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};

var options = {
    edges:{
        arrows: {
        to: {
            enabled: true,
            type: "arrow"
        },
        }
    },
    physics: {
        enabled: false
    }
}

// initialize your network!
var network = new vis.Network(container, data, options);

