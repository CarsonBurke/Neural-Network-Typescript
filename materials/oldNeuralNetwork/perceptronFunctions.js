Perceptron.prototype.mutateWeights = function() {

    const perceptron = this
    const network = networks[perceptron.networkID]

    // Mutate weights

    for (let i = 0; i < perceptron.weights.length; i++) {

        perceptron.weights[i] += Math.random() * network.learningRate + Math.random() * network.learningRate * -1
    }
}

Perceptron.prototype.updateVisual = function() {

    const perceptron = this
    const network = networks[perceptron.networkID]

    // If perceptron's activation is 0

    if (perceptron.activation == 0) {

        // Display 0

        perceptron.visual.innerText = 0

        // Style outline

        perceptron.visual.style.outlineColor = network.inactiveColor

        // And stop

        return
    }

    // Style outline

    perceptron.visual.style.outlineColor = network.activeColor

    // Show perceptrons activation

    perceptron.visual.innerText = (perceptron.activation).toFixed(2)
    return
}

Perceptron.prototype.createWeights = function(inputCount) {

    const perceptron = this

    // Create one weight perceptron in previous layer

    perceptron.weights = []

    // Iterate for number of perceptrons in previous layer

    for (let i = 0; i < inputCount; i++) {

        perceptron.weights.push(0)
    }
}

Perceptron.prototype.run = function(inputs) {

    const perceptron = this
    const network = networks[perceptron.networkID]

    // Reset activation to the bias

    perceptron.activation = network.bias

    // Have loop through and increment i based on the number of inputs

    for (let i = 0; i < inputs.length; i++) {

        // Multiply the input by the weight, adding the result to the the perceptron's activation

        perceptron.activation += inputs[i] * perceptron.weights[i]
    }

    // Implement convert activation to 0 if negative

    perceptron.activation = Math.max(perceptron.activation, 0)
}