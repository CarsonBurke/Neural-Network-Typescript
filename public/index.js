System.register("neuralNetwork/networkManager", [], function (exports_1, context_1) {
    "use strict";
    var NetworkManager, networkManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            NetworkManager = class NetworkManager {
                constructor() {
                    this.activationColor = 'rgb(0, 137, 236)';
                    this.negativeColor = 'rgb(241, 0, 19)';
                    this.learningRate = 1;
                    this.bias = 0;
                    this.hiddenLayersCount = 5;
                    this.hiddenPerceptronCount = 5;
                    const networkManager = this;
                    networkManager.networks = {};
                    networkManager.IDIndex = 0;
                }
                newID() {
                    networkManager.IDIndex += 1;
                    return networkManager.IDIndex.toString();
                }
                initVisuals() {
                    networkManager.visualsParent = document.getElementsByClassName('networkManagerParent')[0];
                    document.getElementById('colorGuideActivation').style.background = networkManager.activationColor;
                    document.getElementById('colorGuideNegative').style.background = networkManager.negativeColor;
                }
            };
            exports_1("networkManager", networkManager = new NetworkManager());
        }
    };
});
System.register("neuralNetwork/networkUtils", ["neuralNetwork/networkManager"], function (exports_2, context_2) {
    "use strict";
    var networkManager_1;
    var __moduleName = context_2 && context_2.id;
    function relu(value) {
        return Math.max(0, value);
    }
    exports_2("relu", relu);
    function mutateDelta() {
        return (Math.random() * networkManager_1.networkManager.learningRate - Math.random() * networkManager_1.networkManager.learningRate);
    }
    exports_2("mutateDelta", mutateDelta);
    return {
        setters: [
            function (networkManager_1_1) {
                networkManager_1 = networkManager_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("neuralNetwork/network", ["neuralNetwork/networkManager", "neuralNetwork/networkUtils"], function (exports_3, context_3) {
    "use strict";
    var networkManager_2, networkUtils_1, Input, Output, NeuralNetwork;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (networkManager_2_1) {
                networkManager_2 = networkManager_2_1;
            },
            function (networkUtils_1_1) {
                networkUtils_1 = networkUtils_1_1;
            }
        ],
        execute: function () {
            Input = class Input {
                constructor(name, values, weightIDs) {
                    this.name = name;
                    this.values = values;
                    this.weightIDs = weightIDs;
                }
            };
            exports_3("Input", Input);
            Output = class Output {
                constructor(name) {
                    this.name = name;
                }
            };
            exports_3("Output", Output);
            NeuralNetwork = class NeuralNetwork {
                constructor(weightLayers = [], activationLayers = []) {
                    const network = this;
                    network.weightLayers = weightLayers;
                    network.activationLayers = activationLayers;
                    network.ID = networkManager_2.networkManager.newID();
                    networkManager_2.networkManager.networks[network.ID] = network;
                }
                init(inputs, outputCount) {
                    this.weightLayers.push([]);
                    this.activationLayers.push([]);
                    for (let i = 0; i < inputs.length; i++) {
                        const input = inputs[i];
                        this.inputWeightLayers.push(input.weightIDs);
                        this.weightLayers[0].push([]);
                        this.activationLayers[0].push(0);
                        for (let value_i = 0; value_i < input.values.length; value_i++) {
                            this.weightsByID[input.weightIDs[value_i]] = networkManager_2.networkManager.bias;
                            this.weightLayers[0][i].push(networkManager_2.networkManager.bias);
                        }
                    }
                    for (let layerIndex = 1; layerIndex < networkManager_2.networkManager.hiddenLayersCount + 1; layerIndex++) {
                        this.weightLayers.push([]);
                        this.activationLayers.push([]);
                        for (let i1 = 0; i1 < networkManager_2.networkManager.hiddenPerceptronCount; i1++) {
                            this.weightLayers[layerIndex].push([]);
                            const previousLayerOutputCount = this.activationLayers[layerIndex - 1].length;
                            for (let i2 = 0; i2 < previousLayerOutputCount; i2++) {
                                this.weightLayers[layerIndex][i1].push(networkManager_2.networkManager.bias);
                            }
                            this.activationLayers[layerIndex].push(0);
                        }
                    }
                    this.weightLayers.push([]);
                    this.activationLayers.push([]);
                    const lastLayerIndex = this.activationLayers.length - 1, previousLayerOutputCount = this.activationLayers[lastLayerIndex - 1].length;
                    for (let i1 = 0; i1 < outputCount; i1++) {
                        this.weightLayers[lastLayerIndex].push([]);
                        for (let i2 = 0; i2 < previousLayerOutputCount; i2++) {
                            this.weightLayers[lastLayerIndex][i1].push(networkManager_2.networkManager.bias);
                        }
                        this.activationLayers[lastLayerIndex].push(0);
                    }
                }
                clone() {
                    const network = this;
                    return new NeuralNetwork(network.weightLayers, network.activationLayers);
                }
                forwardPropagate(inputs) {
                    // First layer using inputs
                    for (let i = 0; i < inputs.length; i++) {
                        this.activationLayers[0][i] = 0;
                    }
                    for (let i = 0; i < inputs.length; i++) {
                        const input = inputs[i];
                        for (let value_i = 0; value_i < input.values.length; value_i++) {
                            this.activationLayers[0][i] = networkUtils_1.relu(input.values[value_i] * this.weightsByID[input.weightIDs[value_i]]);
                        }
                    }
                    // Following layers using previous perceptron's values
                    for (let layerIndex = 1; layerIndex < this.activationLayers.length; layerIndex++) {
                        for (let activationsIndex = 0; activationsIndex < this.activationLayers[layerIndex].length; activationsIndex++) {
                            this.activationLayers[layerIndex][activationsIndex] = 0;
                            for (let previousLayerActivationsIndex = 0; previousLayerActivationsIndex < this.activationLayers[layerIndex - 1].length; previousLayerActivationsIndex++) {
                                this.activationLayers[layerIndex][activationsIndex] += this.activationLayers[layerIndex - 1][previousLayerActivationsIndex] * this.weightLayers[layerIndex][activationsIndex][previousLayerActivationsIndex];
                            }
                            this.activationLayers[layerIndex][activationsIndex] = networkUtils_1.relu(this.activationLayers[layerIndex][activationsIndex] + networkManager_2.networkManager.bias);
                        }
                    }
                }
                /*
                    backPropagate(scoredOutputs) {
                    
                        const network = this
                    
                    
                    }
                     */
                mutate() {
                    // Input layers special for homogenous weights
                    for (const ID in this.weightsByID) {
                        this.weightsByID[ID] += networkUtils_1.mutateDelta();
                    }
                    // Non-input layers
                    for (let layerIndex = 0; layerIndex < this.weightLayers.length; layerIndex++) {
                        for (let activationsIndex = 0; activationsIndex < this.activationLayers[layerIndex].length; activationsIndex++) {
                            for (let weightIndex = 0; weightIndex < this.weightLayers[layerIndex][activationsIndex].length; weightIndex++) {
                                this.weightLayers[layerIndex][activationsIndex][weightIndex] += networkUtils_1.mutateDelta();
                            }
                        }
                    }
                }
                createVisuals(inputs, outputs) {
                    const network = this;
                    // Visual parents
                    network.visualsParent = document.createElement('div');
                    networkManager_2.networkManager.visualsParent.appendChild(network.visualsParent);
                    network.visualsParent.classList.add('networkParent');
                    let descriptionLayers = [], descriptionVisualLayers = [
                        [],
                        []
                    ];
                    // Input descriptions
                    let descriptionLayerVisual = document.createElement('div');
                    descriptionLayerVisual.classList.add('descriptionLayer');
                    descriptionLayerVisual.classList.add('inputDescriptionLayer');
                    network.visualsParent.appendChild(descriptionLayerVisual);
                    descriptionLayers.push(descriptionLayerVisual);
                    for (let activationsIndex = 0; activationsIndex < network.activationLayers[0].length; activationsIndex++) {
                        const descriptionVisual = document.createElement('p');
                        descriptionLayers[0].appendChild(descriptionVisual);
                        descriptionVisualLayers[0].push(descriptionVisual);
                        descriptionVisual.innerText = inputs[activationsIndex].name;
                    }
                    // Inputs
                    network.inputLayerVisuals = [];
                    network.inputLayer = document.createElement('div');
                    network.visualsParent.appendChild(network.inputLayer);
                    network.inputLayer.classList.add('inputLayer');
                    for (let activationsIndex = 0; activationsIndex < network.activationLayers[0].length; activationsIndex++) {
                        const inputVisual = document.createElement('p'), activation = inputs[activationsIndex].values;
                        network.inputLayer.appendChild(inputVisual);
                        network.inputLayerVisuals.push(inputVisual);
                        /*
                                    inputVisual.style.color = activation <= 0 ? networkManager.negativeColor : networkManager.activationColor
                            
                                    inputVisual.innerText = activation.toFixed(2)
                                     */
                        inputVisual.innerText = activation.toString();
                    }
                    // Perceptrons and layers
                    network.perceptronLayers = [];
                    network.perceptronVisualLayers = [];
                    for (let layerIndex = 0; layerIndex < network.activationLayers.length; layerIndex++) {
                        network.perceptronVisualLayers.push([]);
                        const perceptronLayerVisual = document.createElement('div');
                        network.visualsParent.appendChild(perceptronLayerVisual);
                        network.perceptronLayers.push(perceptronLayerVisual);
                        perceptronLayerVisual.classList.add('perceptronLayer');
                        for (let activationsIndex = 0; activationsIndex < network.activationLayers[layerIndex].length; activationsIndex++) {
                            const perceptronVisual = document.createElement('div'), activation = network.activationLayers[layerIndex][activationsIndex];
                            perceptronLayerVisual.appendChild(perceptronVisual);
                            network.perceptronVisualLayers[layerIndex].push(perceptronVisual);
                            perceptronVisual.style.borderColor = activation <= 0 ? networkManager_2.networkManager.negativeColor : networkManager_2.networkManager.activationColor;
                            perceptronVisual.innerText = activation.toFixed(2);
                        }
                    }
                    // Output descriptions
                    descriptionLayerVisual = document.createElement('div');
                    descriptionLayerVisual.classList.add('descriptionLayer');
                    network.visualsParent.appendChild(descriptionLayerVisual);
                    descriptionLayers.push(descriptionLayerVisual);
                    for (let activationsIndex = 0; activationsIndex < network.activationLayers[network.activationLayers.length - 1].length; activationsIndex++) {
                        const descriptionVisual = document.createElement('p');
                        descriptionLayers[1].appendChild(descriptionVisual);
                        descriptionVisualLayers[1].push(descriptionVisual);
                        descriptionVisual.innerText = outputs[activationsIndex].name;
                    }
                    // Lines
                    network.linesParent = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    network.linesParent.classList.add('linesParent');
                    network.visualsParent.appendChild(network.linesParent);
                    network.lineLayers = [
                        []
                    ];
                    for (let layerIndex = 1; layerIndex < network.activationLayers.length; layerIndex++) {
                        network.lineLayers.push([]);
                        for (let activationsIndex = 0; activationsIndex < network.activationLayers[layerIndex].length; activationsIndex++) {
                            network.lineLayers[layerIndex].push([]);
                            for (let weightIndex = 0; weightIndex < network.weightLayers[layerIndex][activationsIndex].length; weightIndex++) {
                                const lineVisual = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                                network.linesParent.appendChild(lineVisual);
                                network.lineLayers[layerIndex][activationsIndex].push(lineVisual);
                                lineVisual.style.stroke = network.weightLayers[layerIndex][activationsIndex][weightIndex] <= 0 ? networkManager_2.networkManager.negativeColor : networkManager_2.networkManager.activationColor;
                                const perceptron1VisualRect = network.perceptronVisualLayers[layerIndex - 1][weightIndex].getBoundingClientRect(), perceptron2VisualRect = network.perceptronVisualLayers[layerIndex][activationsIndex].getBoundingClientRect(), visualsParentRect = network.visualsParent.getBoundingClientRect();
                                lineVisual.setAttribute('x1', Math.floor(perceptron1VisualRect.left + perceptron1VisualRect.width / 2 - visualsParentRect.left).toString());
                                lineVisual.setAttribute('y1', Math.floor(perceptron1VisualRect.top + perceptron1VisualRect.height / 2 - visualsParentRect.top).toString());
                                lineVisual.setAttribute('x2', Math.floor(perceptron2VisualRect.left + perceptron2VisualRect.width / 2 - visualsParentRect.left).toString());
                                lineVisual.setAttribute('y2', Math.floor(perceptron2VisualRect.top + perceptron2VisualRect.height / 2 - visualsParentRect.top).toString());
                            }
                        }
                    }
                }
                updateVisuals(inputs) {
                    const network = this;
                    // Inputs
                    for (let activationsIndex = 0; activationsIndex < network.activationLayers[0].length; activationsIndex++) {
                        const inputVisual = network.inputLayerVisuals[activationsIndex], activation = inputs[activationsIndex].values;
                        /*
                                    inputVisual.style.color = activation <= 0 ? networkManager.negativeColor : networkManager.activationColor
                            
                                    inputVisual.innerText = activation.toFixed(2)
                                     */
                    }
                    // Perceptrons and layers
                    for (let layerIndex = 0; layerIndex < network.activationLayers.length; layerIndex++) {
                        for (let activationsIndex = 0; activationsIndex < network.activationLayers[layerIndex].length; activationsIndex++) {
                            const perceptronVisual = network.perceptronVisualLayers[layerIndex][activationsIndex], activation = network.activationLayers[layerIndex][activationsIndex];
                            perceptronVisual.style.borderColor = activation <= 0 ? networkManager_2.networkManager.negativeColor : networkManager_2.networkManager.activationColor;
                            perceptronVisual.innerText = activation.toFixed(2);
                        }
                    }
                    // Lines
                    for (let layerIndex = 1; layerIndex < network.activationLayers.length; layerIndex++) {
                        for (let activationsIndex = 0; activationsIndex < network.activationLayers[layerIndex].length; activationsIndex++) {
                            for (let weightIndex = 0; weightIndex < network.weightLayers[layerIndex][activationsIndex].length; weightIndex++) {
                                const lineVisual = network.lineLayers[layerIndex][activationsIndex][weightIndex];
                                lineVisual.setAttribute('text', network.weightLayers[layerIndex][activationsIndex][weightIndex].toString());
                                lineVisual.style.stroke = network.weightLayers[layerIndex][activationsIndex][weightIndex] <= 0 ? networkManager_2.networkManager.negativeColor : networkManager_2.networkManager.activationColor;
                            }
                        }
                    }
                }
            };
            exports_3("NeuralNetwork", NeuralNetwork);
        }
    };
});
System.register("index", ["neuralNetwork/network", "neuralNetwork/networkManager"], function (exports_4, context_4) {
    "use strict";
    var network_1, networkManager_3, inputs, outputs;
    var __moduleName = context_4 && context_4.id;
    function startNetworks() {
        const network = new network_1.NeuralNetwork();
        network.init(inputs, outputs.length);
        network.createVisuals(inputs, outputs);
        const newNetwork = new network_1.NeuralNetwork(network.weightLayers, network.activationLayers);
        newNetwork.createVisuals(inputs, outputs);
    }
    function runNetworks() {
        for (const networkID in networkManager_3.networkManager.networks) {
            const network = networkManager_3.networkManager.networks[networkID];
            network.forwardPropagate(inputs);
            network.updateVisuals(inputs);
            network.mutate();
        }
    }
    return {
        setters: [
            function (network_1_1) {
                network_1 = network_1_1;
            },
            function (networkManager_3_1) {
                networkManager_3 = networkManager_3_1;
            }
        ],
        execute: function () {
            networkManager_3.networkManager.initVisuals();
            inputs = [
                new network_1.Input('X', [
                    10,
                ], [
                    '1'
                ]),
                new network_1.Input('Y', [
                    8,
                ], [
                    '2'
                ]),
            ], outputs = [
                new network_1.Output('Z'),
                new network_1.Output('X'),
            ];
            window.addEventListener('load', startNetworks);
            setInterval(runNetworks, 1000);
        }
    };
});
//# sourceMappingURL=index.js.map