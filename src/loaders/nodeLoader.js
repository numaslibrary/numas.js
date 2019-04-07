const fs = require('fs')

const loader = {
    /**
     * Loads file asynchronously
     * 
     * @param {number} name Name or path to the wasm module
     * @returns {Promise}
     */
    loadAsync: (name) => () => new Promise((resolve, reject) => {
        fs.readFile(name, (error, data) => error ? reject(error) : resolve(data))
    }),

    /**
     * Loads file synchronously
     * 
     * @param {number} name Name or path to the wasm module
     * @returns {Promise}
     */
    loadSync: (name) => () => new Promise(resolve => {
        resolve(fs.readFileSync(name))
    })
}

module.exports = loader
