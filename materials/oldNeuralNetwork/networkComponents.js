class Perceptron {
    constructor(opts) {

        const perceptron = this

        // Assign opts

        for (const propertyName in opts) {

            perceptron[propertyName] = opts[propertyName]
        }

        // Create empty properties for the future

        perceptron.weights = []
        perceptron.lines = []
    }
}

class Layer {
    constructor(opts) {

        const layer = this

        // Assign opts

        for (let propertyName in opts) {

            layer[propertyName] = opts[propertyName]
        }

        // Create empty objects for future properties

        layer.perceptrons = {}
    }
}

class NeuralNetwork {
    constructor(opts) {

        const network = this

        // Assign default values

        for (const valueName in defaults) {

            network[valueName] = defaults[valueName]
        }

        // Assign opts

        for (const valueName in opts) {

            network[valueName] = opts[valueName]
        }

        // Assign an ID and add to networks

        network.id = newID()
        networks[network.id] = network

        // Create empty objects for future properties

        network.layers = {}
    }
}