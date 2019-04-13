const datatypes = require('./../metadata/datatypes').DATATYPES

class Helper {
    constructor(wasmModule) {
        /** @private */
        this.wasmModule = wasmModule
    }

    /**
     * Initialize new shape vector in WebAssembly memory and return its pointer
     * 
     * @param {Object} wasmModule WebAssembly module
     * @return {number}
     */
    createShape(shape) {
        const len = shape.length
        const ptr = this.wasmModule.functions.instantiate_vector_i32(len)    
        let tmp = new Int32Array(this.wasmModule.memory.buffer, ptr, 1)
        tmp = new Int32Array(this.wasmModule.memory.buffer, tmp[0], len)
        tmp.set(shape, 0)

        return ptr
    }

    /**
     * Initialize new vector of type in WebAssembly memory and return its pointer
     * 
     * @param {Array} data Data to fill vector with
     * @param {string} datatype Type of data
     * @return {number}
     */
    createVector(data, datatype) {
        const len = data.length
        const ptr = this.wasmModule.functions.instantiate_vector_i32(len)    
        let tmp = new Int32Array(this.wasmModule.memory.buffer, ptr, 1)
        tmp = new datatypes[datatype](this.wasmModule.memory.buffer, tmp[0], len)
        tmp.set(data, 0)

        return ptr
    }
}

let helper = null

const createHelper = wasmModule => {
    helper = new Helper(wasmModule)

    return helper
}

const getHelper = () => helper

module.exports = {
    createHelper,
    getHelper,
}
