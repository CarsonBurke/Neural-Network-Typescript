class NetworkManager {
    constructor() {

        const networkManager = this

        networkManager.networks = {}

        networkManager.learningRate = 0.1
        networkManager.IDIndex = 0

        // Network structure settings

        networkManager.hiddenLayersCount = 2
        networkManager.hiddenPerceptronCount = 3

        // Visuals

        networkManager.visualsParent = document.getElementsByClassName('networkManagerParent')[0]
    }
}

const networkManager = new NetworkManager()

NetworkManager.prototype.newID = function() {

    return networkManager.IDIndex++
}