setInterval(runNetworks, 100)

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

createNetworks()

function createNetworks() {

    const network = new NeuralNetwork()
    network.construct(inputs.length, outputs.length)
}

runNetworks()

function runNetworks() {

    for (const networkID in networkManager.networks) {

        const network = networkManager.networks[networkID]

        network.forwardPropagate(inputValues)

        console.log(network)
    }
}