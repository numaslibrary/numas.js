/**
 * Instantiates wasm module from given loader
 * 
 * @param {object} loader Loader which will provide data
 * @returns {Promise}
 */
const instantiate = loader => new Promise((resolve, reject) => {
    loader().then(source => {
        const env = {
            memoryBase: 0,
            tableBase: 0,
            memory: new WebAssembly.Memory({
                initial: 256,
            }),
            table: new WebAssembly.Table({
                initial: 0,
                element: 'anyfunc',
            }),
        }

        let buffer = new Uint8Array(source)

        WebAssembly.instantiate(buffer, { env })
            .then(result => resolve(result))
            .catch(error => reject(error))
    })
})

module.exports = {
    instantiate,
}
