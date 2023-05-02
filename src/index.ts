import { Input, NeuralNetwork, Output } from "./neuralNetwork/network"
import { networkManager } from "./neuralNetwork/networkManager"

networkManager.initVisuals()

const inputs = [
    new Input(
            'X', 
            [
                10,
            ],
            [
                '1'
            ],
        ),
        new Input(
            'Y', 
            [
                8,
            ],
            [
                '2'
            ],
        ),
    ],
    outputs = [
        new Output('Z'),
        new Output('X'),
    ]

window.addEventListener('load', startNetworks)

function startNetworks() {

    const network = new NeuralNetwork()
    network.init(inputs, outputs.length)
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

        network.mutate()
    }
}