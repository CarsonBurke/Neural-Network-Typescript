class NeuralNetwork {
    constructor(weights = [], activations = []) {

        const network = this

        network.weightLayers = weights
        network.activationLayers = activations

        network.ID = networkManager.newID()

        networkManager.networks[network.ID] = network
    }
}

NeuralNetwork.prototype.construct = function(inputCount, outputCount) {

    const network = this

    network.weightLayers.push([])
    network.activationLayers.push([])

    for (let i = 0; i < inputCount; i++) {

        network.activationLayers[0].push(0)
    }

    for (let layerIndex = 1; layerIndex < networkManager.hiddenLayersCount + 1; layerIndex++) {

        network.weightLayers.push([])
        network.activationLayers.push([])

        for (let i = 0; i < networkManager.hiddenPerceptronCount; i++) {

            network.activationLayers[layerIndex].push(0)
        }
    }

    network.weightLayers.push([])
    network.activationLayers.push([])

    for (let i = 0; i < outputCount; i++) {

        network.activationLayers[network.activationLayers.length - 1].push(0)
    }
}

NeuralNetwork.prototype.clone = function() {

    const network = this

    return new NeuralNetwork(network.weightLayers)
}

NeuralNetwork.prototype.forwardPropagate = function(inputValues) {

    const network = this

    for (let activationsIndex = 0; activationsIndex < network.activationLayers[0].length; activationsIndex++) {

        network.activationLayers[0][activationsIndex] = inputValues[activationsIndex] * network.weightLayers[0][activationsIndex]
    }

    for (let layerIndex = 1; layerIndex < network.activationLayers.length; layerIndex++) {

        for (let activationsIndex = 0; activationsIndex < network.activationLayers[activationsIndex].length; activationsIndex++) {

            network.activationLayers[layerIndex][activationsIndex] = inputValues[activationsIndex] * network.weightLayers[layerIndex][activationsIndex]
        }
    }
}

NeuralNetwork.prototype.learn = function() {

    const network = this

    for (let layerIndex = 0; layerIndex < network.weightLayers.length; layerIndex++) {

        for (let weightIndex = 0; weightIndex < network.weightLayers[layerIndex].length; weightIndex++) {

            network.weightLayers[layerIndex][weightIndex] += Math.random() * networkManager.learningRate - Math.random() * networkManager.learningRate
        }
    }
}

NeuralNetwork.prototype.createVisuals = function() {

    const network = this


}

NeuralNetwork.prototype.updateVisuals = function() {

    const network = this


}