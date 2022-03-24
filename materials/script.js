networkManager.initVisuals()

const inputs = [
        { name: 'Information about thomas', value: 10 },
    ],
    inputValues = [],
    outputs = [
        { name: 'Thomas is cool', operation: function() { console.log('thomas is cool') } },
    ]

for (const input of inputs) {

    inputValues.push(input.value)
}

window.addEventListener('load', startNetworks)

function startNetworks() {

    const network = new NeuralNetwork()
    network.construct(inputs.length, outputs.length)
    network.createVisuals(inputs, outputs)

    console.log(network)
}

setInterval(runNetworks, 1000)

function runNetworks() {

    for (const networkID in networkManager.networks) {

        const network = networkManager.networks[networkID]

        network.learn()

        network.forwardPropagate(inputValues)

        network.updateVisuals(inputValues)
    }
}