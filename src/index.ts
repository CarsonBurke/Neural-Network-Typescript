import { NeuralNetwork } from "./neuralNetwork/network"
import { networkManager } from "./networkManager"

networkManager.initVisuals()

const inputs = [
        { name: 'X', value: 10 },
        { name: 'Y', value: 10 },
    ],
    outputs = [
        { name: 'X', operation: function() {} },
        { name: 'Y', operation: function() {} },
    ]

window.addEventListener('load', startNetworks)

function startNetworks() {

    const network = new NeuralNetwork()
    network.init(inputs.length, outputs.length)
    network.createVisuals(inputs, outputs)

    const newNetwork = new NeuralNetwork(network.weightLayers, network.activationLayers)
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