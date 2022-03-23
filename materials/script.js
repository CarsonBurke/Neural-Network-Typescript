const inputs = [
        { name: '#1', value: 1 },
        { name: '#5', value: 5 },
    ],
    inputValues = [],
    outputs = [
        { name: 'action1', operation: function() {} },
    ]

for (const input of inputs) {

    inputValues.push(input.value)
}

window.addEventListener('load', startNetworks)

function startNetworks() {

    const network = new NeuralNetwork()
    network.construct(inputs.length, outputs.length)

    console.log(network)
}

setInterval(runNetworks, 1000)

function runNetworks() {

    for (const networkID in networkManager.networks) {

        const network = networkManager.networks[networkID]

        network.learn()

        network.forwardPropagate(inputValues)
    }
}