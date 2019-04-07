let numas = null

/**
 * Sets module reference
 * 
 * @param {object} newNumasModule Object of numas wasm module
 * @returns {void}
 */
const setNumasModule = newNumasModule => {
    numas = newNumasModule
}

module.exports = {
    numas,
    setNumasModule,
}
