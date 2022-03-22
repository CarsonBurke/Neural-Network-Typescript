NeuralNetwork.prototype.addLayer = function() {

    const network = this

    let layerCount = Object.keys(network.layers).length

    network.layers[layerCount] = new Layer({
        networkID: network.id,
        name: layerCount,
    })

    return network.layers[layerCount]
}
NeuralNetwork.prototype.forwardPropagate = function(inputs) {

    const network = this

    // Loop through layers

    for (const layerName in network.layers) {

        const layer = network.layers[layerName]

        // loop through perceptrons in the layer

        for (const perceptronName in layer.perceptrons) {

            const perceptron = layer.perceptrons[perceptronName]

            const perceptronInputs = []

            // If in first layer

            if (layerName == 0) {

                // Assign input value relative to perceptronName

                perceptronInputs.push(Object.values(inputs)[perceptronName].value)

                perceptron.run(perceptronInputs)
                continue
            }

            const previousLayer = network.layers[layerName - 1]

            for (const perceptronID in previousLayer.perceptrons) {

                const previousPerceptron = previousLayer.perceptrons[perceptronID]

                perceptronInputs.push(previousPerceptron.activation)
            }

            perceptron.run(perceptronInputs)
            continue
        }
    }
}

NeuralNetwork.prototype.learn = function() {

    const network = this

    // Loop through layers in network

    for (const layerName in network.layers) {

        const layer = network.layers[layerName]

        // Loop through perceptrons in the layer

        for (const perceptronName in layer.perceptrons) {

            const perceptron = layer.perceptrons[perceptronName]

            // Mutate perceptron

            perceptron.mutateWeights()
        }
    }
}
NeuralNetwork.prototype.createVisuals = function(inputs, outputs) {

    const network = this

    // Create visuals parent

    let visualsParent = document.createElement("div")

    visualsParent.classList.add("visualsParent")

    visualsParent.style.width = Object.keys(network.layers).length * network.layerVisualWidth + "px"

    document.getElementsByClassName('networkVisualsParent')[0].appendChild(visualsParent)
    network.visualsParent = visualsParent

    // Create svg

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.classList.add("lineParent")

    network.visualsParent.appendChild(svg)
    network.svg = svg

    // Loop through each layer

    for (const layerName in network.layers) {

        const layer = network.layers[layerName]

        // make sure there isn't already a visual

        if (layer.visual) continue

        // Create visuals for the layer

        const layerVisual = document.createElement("div")

        layerVisual.classList.add("layerVisual")

        network.visualsParent.appendChild(layerVisual)
        layer.visual = layerVisual

        // loop through perceptrons in the layer

        for (const perceptron1Name in layer.perceptrons) {

            const perceptron1 = layer.perceptrons[perceptron1Name]

            // Create visuals for the perceptron

            const perceptronVisual = document.createElement("div")

            perceptronVisual.classList.add("perceptronVisual")

            // Colour first and last perceptrons

            if (layerName == 0) {

                perceptronVisual.classList.add("inputPerceptron")

            } else if (layerName == Object.keys(network.layers).length - 1) {

                perceptronVisual.classList.add("outputPerceptron")
            }

            //

            layer.visual.appendChild(perceptronVisual)
            perceptron1.visual = perceptronVisual
        }
    }

    network.createLineVisuals()
    network.createTextVisuals(inputs, outputs)
}
NeuralNetwork.prototype.createLineVisuals = function() {

    const network = this

    for (const layerName in network.layers) {

        const layer = network.layers[layerName]

        // loop through perceptrons in the layer

        for (const perceptron1Name in layer.perceptrons) {

            const perceptron1 = layer.perceptrons[perceptron1Name]

            // Find layer after network one

            const proceedingLayer = network.layers[parseInt(layerName) + 1]

            if (!proceedingLayer) continue

            // Loop through each perceptron in the next layer and draw a line

            for (const perceptron2Name in proceedingLayer.perceptrons) {

                const perceptron2 = proceedingLayer.perceptrons[perceptron2Name]

                // Create line el

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')

                // Get rect of perceptronVisuals

                const perceptron1VisualRect = perceptron1.visual.getBoundingClientRect()

                // Construct line positions

                const x1 = Math.floor(perceptron1VisualRect.left)
                const y1 = Math.floor(perceptron1VisualRect.top)

                // Get rect of perceptronVisuals

                const perceptron2VisualRect = perceptron2.visual.getBoundingClientRect()

                // Construct line positions

                const x2 = Math.floor(perceptron2VisualRect.left)
                const y2 = Math.floor(perceptron2VisualRect.top)

                // Get rect of visualsParent

                const visualsParentRect = network.visualsParent.getBoundingClientRect()

                // Implement line positions into element

                line.setAttribute('x1', x1 + perceptron1.visual.offsetWidth / 2 - visualsParentRect.left)
                line.setAttribute('y1', y1 + perceptron1.visual.offsetHeight / 2 - visualsParentRect.top)
                line.setAttribute('x2', x2 + perceptron2.visual.offsetWidth / 2 - visualsParentRect.left)
                line.setAttribute('y2', y2 + perceptron2.visual.offsetHeight / 2 - visualsParentRect.top)

                // Give line class

                line.classList.add("line")

                // Add line to line visuals element

                network.svg.appendChild(line)

                perceptron1.lines.push(line)
            }
        }
    }
}
NeuralNetwork.prototype.createTextVisuals = function(inputs, outputs) {

    const network = this

    let i = 0

    for (const perceptronName in network.layers[0].perceptrons) {

        const perceptron = network.layers[0].perceptrons[perceptronName]

        const textVisual = document.createElement('h3')

        textVisual.innerText = inputs[i].name

        textVisual.classList.add('textVisual')

        textVisual.style.top = perceptron.visual.getBoundingClientRect().top + perceptron.visual.offsetHeight / 4 - network.visualsParent.getBoundingClientRect().top + 'px'
        textVisual.style.right = network.visualsParent.getBoundingClientRect().left - perceptron.visual.getBoundingClientRect().left + Object.keys(network.layers).length * network.layerVisualWidth + 10 + 'px'

        textVisual.style.textAlign = 'right'

        network.visualsParent.appendChild(textVisual)

        i++
    }

    i = 0

    const layerCount = Object.keys(network.layers).length

    for (const perceptronName in network.layers[layerCount - 1].perceptrons) {

        const perceptron = network.layers[layerCount - 1].perceptrons[perceptronName]

        const textVisual = document.createElement('h3')

        textVisual.innerText = outputs[i].name

        textVisual.classList.add('textVisual')

        textVisual.style.top = perceptron.visual.getBoundingClientRect().top + perceptron.visual.offsetHeight / 4 - network.visualsParent.getBoundingClientRect().top + 'px'
        textVisual.style.left = perceptron.visual.getBoundingClientRect().left + perceptron.visual.offsetWidth - network.visualsParent.getBoundingClientRect().left + 10 + 'px'

        textVisual.style.textAlign = 'left'

        network.visualsParent.appendChild(textVisual)

        i++
    }
}

NeuralNetwork.prototype.updateVisuals = function() {

    const network = this

    for (const layerName in network.layers) {

        const layer = network.layers[layerName]

        // Loop through perceptrons in the layer

        for (const perceptronName in layer.perceptrons) {

            const perceptron = layer.perceptrons[perceptronName]

            // Update perceptron's visuals

            perceptron.updateVisual()

            //

            for (const line of perceptron.lines) {

                if (perceptron.activation > 0) {

                    line.style.stroke = network.activeColor
                } else line.style.stroke = network.inactiveColor
            }
        }
    }
}
NeuralNetwork.prototype.init = function(inputs, outputs) {

    const network = this

    network.createVisuals(inputs, outputs)

    for (const layerName in network.layers) {

        const layer = network.layers[layerName]

        // Loop through perceptrons in the layer

        for (const perceptronName in layer.perceptrons) {

            const perceptron = layer.perceptrons[perceptronName]

            // Find layer after network one

            if (layerName == 0) {

                perceptron.createWeights(1)
                continue
            }

            const preceedingLayer = network.layers[parseInt(layerName) - 1],

                inputCount = Object.keys(preceedingLayer.perceptrons).length

            perceptron.createWeights(inputCount)
        }
    }
}

NeuralNetwork.prototype.clone = function(inputs, outputs) {

    const network = this

    // Create new neural net

    const newNeuralNetwork = new NeuralNetwork()

    for (const layerName in network.layers) {

        const layer = network.layers[layerName]

        // Create layer for newNeuralNetwork

        newNeuralNetwork.addLayer({})

        const newLayer = newNeuralNetwork.layers[layerName]

        // Loop through perceptrons in layer

        for (const perceptronName in layer.perceptrons) {

            const perceptron = layer.perceptrons[perceptronName]

            newLayer.addPerceptron()
            const newPerceptron = newLayer.perceptrons[perceptronName]

            newPerceptron.weights = perceptron.weights
        }
    }

    // Initialize newNeuralNetwork

    newNeuralNetwork.init(inputs, outputs)

    // Inform new network

    return newNeuralNetwork
}