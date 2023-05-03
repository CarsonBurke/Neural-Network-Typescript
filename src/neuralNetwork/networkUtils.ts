

function relu(value: number) {

    return Math.max(0, value)
}

function mutateDelta() {

    return (Math.random() * networkManager.learningRate - Math.random() * networkManager.learningRate)
}