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

    for (let i = 0; i < inputValues.length; i++) {

        network.activationLayers[0][i] = Math.max(0, inputValues[i] * network.weightLayers[0][i])
    }

    for (let layerIndex = 1; layerIndex < network.activationLayers - 1; layerIndex++) {

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

NeuralNetwork.prototype.createVisuals = function(inputs, outputs) {

    const network = this

    network.visualsParent = document.createElement('div')
    network.visualsParent.classList.add('networkParent')

    networkManager.visualsParent.appendChild(network.visualsParent)

    network.perceptronLayers = []
    network.perceptronVisualLayers = []

    network.descriptionLayers = []
    network.descriptionVisualLayers = [
        [],
        []
    ]

    let descriptionLayerVisual = document.createElement('div')
    descriptionLayerVisual.classList.add('descriptionLayer')

    descriptionLayerVisual.classList.add('inputDescriptionLayer')

    network.visualsParent.appendChild(descriptionLayerVisual)
    network.descriptionLayers.push(descriptionLayerVisual)

    for (let activationsIndex = 0; activationsIndex < network.activationLayers[0].length; activationsIndex++) {

        const descriptionVisual = document.createElement('p')

        descriptionVisual.innerText = inputs[activationsIndex].name

        network.descriptionLayers[0].appendChild(descriptionVisual)
        network.descriptionVisualLayers[0].push(descriptionVisual)
    }

    for (let layerIndex = 0; layerIndex < network.activationLayers.length; layerIndex++) {

        network.perceptronVisualLayers.push([])

        const perceptronLayerVisual = document.createElement('div')
        perceptronLayerVisual.classList.add('perceptronLayer')

        if (layerIndex == 0) perceptronLayerVisual.classList.add('inputPerceptronLayer')
        else if (layerIndex == network.activationLayers.length - 1) perceptronLayerVisual.classList.add('outputPerceptronLayer')
        else perceptronLayerVisual.classList.add('hiddenPerceptronLayer')

        network.visualsParent.appendChild(perceptronLayerVisual)
        network.perceptronLayers.push(perceptronLayerVisual)

        for (let activationsIndex = 0; activationsIndex < network.activationLayers[layerIndex].length; activationsIndex++) {

            const perceptronVisual = document.createElement('div')

            perceptronVisual.innerText = network.activationLayers[layerIndex][activationsIndex]

            perceptronLayerVisual.appendChild(perceptronVisual)
            network.perceptronVisualLayers[layerIndex].push(perceptronVisual)
        }
    }

    descriptionLayerVisual = document.createElement('div')
    descriptionLayerVisual.classList.add('descriptionLayer')

    network.visualsParent.appendChild(descriptionLayerVisual)
    network.descriptionLayers.push(descriptionLayerVisual)

    for (let activationsIndex = 0; activationsIndex < network.activationLayers[network.activationLayers.length - 1].length; activationsIndex++) {

        const descriptionVisual = document.createElement('p')

        descriptionVisual.innerText = outputs[activationsIndex].name

        network.descriptionLayers[1].appendChild(descriptionVisual)
        network.descriptionVisualLayers[1].push(descriptionVisual)
    }
}

NeuralNetwork.prototype.updateVisuals = function() {

    const network = this


}