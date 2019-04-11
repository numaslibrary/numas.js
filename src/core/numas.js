const builder = require('./../builder')
const Helper = require('./helper')
const Factory = require('./factory')
const NArray = require('./array')

const numas = {
    /** @type {Helper} */
    helper: {},
    /** @type {Factory} */
    factory: {},
    /** @type {NArray} */
    Array: {},
}

builder.addCallback((wasmModule) => {
    numas.Array = NArray
    numas.helper = new Helper(wasmModule)
    numas.factory = new Factory(wasmModule, numas)
})

module.exports = numas
