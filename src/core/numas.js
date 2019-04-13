const builder = require('./../builder')
const helper = require('./helper')
const Factory = require('./factory')
const NArray = require('./array')

let numas = {
    /** @type {Helper} */
    helper: {},
    /** @type {Factory} */
    factory: {},
    /** @type {NArray} */
    Array: {},
}

builder.addCallback((wasmModule) => {
    numas.helper = helper.createHelper(wasmModule)
    numas.factory = new Factory(wasmModule, numas)
    numas.Array = NArray
})

module.exports = numas
