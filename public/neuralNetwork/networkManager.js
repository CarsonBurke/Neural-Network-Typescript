"use strict";
class NetworkManager {
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
}
const networkManager = new NetworkManager();
//# sourceMappingURL=networkManager.js.map