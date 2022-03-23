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

        network.weightLayers[0].push([0])

        network.activationLayers[0].push(0)
    }

    for (let layerIndex = 1; layerIndex < networkManager.hiddenLayersCount + 1; layerIndex++) {

        network.weightLayers.push([])
        network.activationLayers.push([])

        for (let i1 = 0; i1 < networkManager.hiddenPerceptronCount; i1++) {

            network.weightLayers[layerIndex].push([])

            const previousLayerOutputCount = network.activationLayers[layerIndex - 1].length

            for (let i2 = 0; i2 < previousLayerOutputCount; i2++) {

                network.weightLayers[layerIndex][i1].push(0)
            }

            network.activationLayers[layerIndex].push(0)
        }
    }

    network.weightLayers.push([])
    network.activationLayers.push([])

    const lastLayerIndex = [network.activationLayers.length - 1],
        previousLayerOutputCount = network.activationLayers[lastLayerIndex - 1].length

    for (let i1 = 0; i1 < outputCount; i1++) {

        network.weightLayers[lastLayerIndex].push([])

        for (let i2 = 0; i2 < previousLayerOutputCount; i2++) {

            network.weightLayers[lastLayerIndex][i1].push(0)
        }

        network.activationLayers[lastLayerIndex].push(0)
    }


}

NeuralNetwork.prototype.clone = function() {

    const network = this

    return new NeuralNetwork(network.weightLayers)
}

NeuralNetwork.prototype.forwardPropagate = function(inputValues) {

    const network = this

    //

    for (let i = 0; i < inputValues.length; i++) {

        network.activationLayers[0][i] = Math.max(0, inputValues[i] * network.weightLayers[0][i])
    }

    for (let layerIndex = 1; layerIndex < networkManager.hiddenLayersCount + 2; layerIndex++) {

        for (let activationsIndex = 0; activationsIndex < network.activationLayers[layerIndex].length; activationsIndex++) {

            for (let previousLayerActivationsIndex = 0; previousLayerActivationsIndex < network.activationLayers[layerIndex - 1].length; previousLayerActivationsIndex++) {

                network.activationLayers[layerIndex][activationsIndex] += network.activationLayers[layerIndex - 1][previousLayerActivationsIndex] * network.weightLayers[layerIndex][activationsIndex][previousLayerActivationsIndex]
            }

            network.activationLayers[layerIndex][activationsIndex] = Math.max(0, network.activationLayers[layerIndex][activationsIndex])
        }
    }
}

NeuralNetwork.prototype.learn = function() {

    const network = this

    for (let layerIndex = 0; layerIndex < network.weightLayers.length; layerIndex++) {

        for (let activationsIndex = 0; activationsIndex < network.activationLayers[layerIndex].length; activationsIndex++) {

            for (let weightIndex = 0; weightIndex < network.weightLayers[layerIndex][activationsIndex].length; weightIndex++) {

                network.weightLayers[layerIndex][activationsIndex][weightIndex] += Math.random() * networkManager.learningRate - Math.random() * networkManager.learningRate
            }
        }
    }
}

NeuralNetwork.prototype.createVisuals = function() {

    const network = this


}

NeuralNetwork.prototype.updateVisuals = function() {

    const network = this


}