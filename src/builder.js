const callbacks = []

/**
 * Add callback that is called when numas module is instantiated
 * 
 * @param {Function} callback Callback
 * @returns {void}
 */
const addCallback = callback => {
    callbacks.push(callback)
}

/**
 * Invokes callbacks with wasmModule as argument
 * 
 * @param {Object} wasmModule WebAssembly numas module
 * @returns {void}
 */
const buildModule = wasmModule => {
    const mod = {
        memory: wasmModule.instance.exports.memory,
        functions: wasmModule.instance.exports,
    }

    for (callback of callbacks) {
        callback(mod)
    }
} 

module.exports = {
    buildModule,
    addCallback,
}
