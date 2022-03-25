networkManager.initVisuals()

const inputs = [{
        name: 'X',
        value: 10
    }, { name: 'Y', value: 10 }, ],
    inputValues = [],
    outputs = [
        { name: 'X', operation: function() {} },
        { name: 'Y', operation: function() {} },
    ]

for (const input of inputs) {

    inputValues.push(input.value)
}

window.addEventListener('load', startNetworks)

function startNetworks() {

    const network = new NeuralNetwork()
    network.construct(inputs.length, outputs.length)
    network.createVisuals(inputs, outputs)
}

setInterval(runNetworks, 1000)

function runNetworks() {

    for (const networkID in networkManager.networks) {

        const network = networkManager.networks[networkID]

        network.forwardPropagate(inputValues)

        network.updateVisuals(inputValues)

        network.learn()
    }
}