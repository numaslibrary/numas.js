const datatypes = require('./../metadata/datatypes').DATATYPES

class Helper {
    constructor(wasmModule) {
        /** @private */
        this.wasmModule = wasmModule
    }

    /**
     * Initialize new shape vector in WebAssembly memory and return its pointer
     * 
     * @param {Array} shape Shape
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
     * Converts Rust WebAssembly vector to JavaScript array
     * 
     * @param {number} vector Pointer to vector
     * @param {number} len Length of vector
     * @param {String} datatype Datatype of array
     * @return {Array}
     */
    vectorToArray(vector, len, datatype = 'i32') {
        let tmp = new Int32Array(this.wasmModule.memory.buffer, vector, 3)
        tmp = new datatypes[datatype](this.wasmModule.memory.buffer, tmp[0], len)

        const array = tmp.slice()
        this.wasmModule.functions[`free_vector_${datatype}`](vector)

        return array
    }

    /**
     * Returns vector length
     * 
     * @param {number} vector Pointer to vector
     * @return {number}
     */
    getVectorLength(vector) {
        let tmp = new Int32Array(this.wasmModule.memory.buffer, vector, 3)
        return tmp[2]
    }

    /**
     * Initialize new indices vector in WebAssembly memory and return its pointer
     * 
     * @param {Array} indices Indices array
     * @return {number}
     */
    createIndices(indices) {
        const buffer = []

        for (let i of indices) {
            if (Number.isInteger(i)) {
                buffer.push(i)
                buffer.push(0)
            } else if (Array.isArray(i) && i.length === 2 && Number.isInteger(i[0]) && Number.isInteger(i[1])) {
                buffer.push(i[0])
                buffer.push(i[1])
            } else {
                throw 'Indices must contain either number or array with two numbers'
            }
        }

        const len = buffer.length
        const ptr = this.wasmModule.functions.instantiate_vector_usize(len) 
        
        let tmp = new Int32Array(this.wasmModule.memory.buffer, ptr, 1)
        tmp = new Int32Array(this.wasmModule.memory.buffer, tmp[0], len)
        tmp.set(buffer, 0)
        
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
        const ptr = this.wasmModule.functions[`instantiate_vector_${datatype}`](len)    
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
