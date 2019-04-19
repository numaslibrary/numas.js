const builder = require('./../builder')
const helper = require('./helper')
const Factory = require('./factory')
const NDArray = require('./array')
const cleaner = require('./cleaner')

let numas = {
    /** @type {Helper} */
    helper: {},
    /** @type {Factory} */
    factory: {},
    /** @type {NDArray} */
    Array: {},
    /** @type {Object} */
    cleaner: cleaner,
}

builder.addCallback((wasmModule) => {
    numas.helper = helper.createHelper(wasmModule)
    numas.factory = new Factory(wasmModule, numas)
    numas.Array = NDArray
})

module.exports = numas
