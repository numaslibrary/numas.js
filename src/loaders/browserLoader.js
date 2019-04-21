const loader = {
    /**
     * Loads file asynchronously
     * 
     * @param {number} name Name or path to the wasm module
     * @returns {Promise}
     */
    loadAsync: name => () => new Promise(resolve => fetch(name).then(data => resolve(data.arrayBuffer())))
}

module.exports = loader
