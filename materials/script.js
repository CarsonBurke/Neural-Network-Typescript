networkManager.initVisuals()

const inputs = [{
        name: 'X',
        value: 10
    }, { name: 'Y', value: 10 }, ],
    outputs = [
        { name: 'X', operation: function() {} },
        { name: 'Y', operation: function() {} },
    ]

window.addEventListener('load', startNetworks)

function startNetworks() {

    const network = new NeuralNetwork()
    network.construct(inputs.length, outputs.length)
    network.createVisuals(inputs, outputs)

    const newNetwork = network.clone(inputs)
    newNetwork.createVisuals(inputs, outputs)
}

setInterval(runNetworks, 1000)

function runNetworks() {

    for (const networkID in networkManager.networks) {

        const network = networkManager.networks[networkID]

        network.forwardPropagate(inputs)

        network.updateVisuals(inputs)

        network.learn()
    }
}