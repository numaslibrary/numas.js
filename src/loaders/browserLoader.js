const loader = {
    /**
     * Loads file asynchronously
     * 
     * @param {number} name Name or path to the wasm module
     * @returns {Promise}
     */
    loadAsync: name => () => fetch(name)
}

module.exports = loader
