const datatypes = require('../metadata/datatypes')
const NDArray = require('./array')

class Factory {
    /**
     * Initialized new factory intance
     * 
     * @param {Object} wasmModule WebAssembly module
     * @param {Object} numas
     */
    constructor(wasmModule, numas) {
        const functions = ['ones', 'zeros', 'full']
    
        /** @private */
        this.numas = numas
        
        /** @private */
        this.functions = {}

        for (let type in datatypes.DATATYPES) {
            this.functions[type] = {}
        }

        for (let func of functions) {
            for (let type in datatypes.DATATYPES) {
                this.functions[type][func] = wasmModule.functions[func + '_' + type] 
            }
        }
    }

    /**
     * Creates new array filled with ones
     * 
     * @param {Array} shape Shape of array
     * @param {string} datatype Datatype
     * @return {NDArray}
     */
    ones(shape, datatype = 'i32') {
        return new NDArray(this.functions[datatype].ones(this.numas.helper.createShape(shape)), datatype)
    }

    /**
     * Creates new array filled with zeros
     * 
     * @param {Array} shape Shape of array
     * @param {string} datatype Datatype
     */
    zeros(shape, datatype = 'i32') {
        return new NDArray(this.functions[datatype].zeros(this.numas.helper.createShape(shape)), datatype)
    }

    /**
     * Creates new array filled with zeroes
     * 
     * @param {Array} shape Shape of array
     * @param {string} datatype Datatype
     * @return {NDArray}
     */
    zeroes(shape, datatype = 'i32') {
        return new NDArray(this.functions[datatype].zeros(this.numas.helper.createShape(shape)), datatype)
    }

    /**
     * Creates new array filled with given value
     * 
     * @param {Array} shape Shape of array
     * @param {string} datatype Datatype
     * @return {NDArray}
     */
    full(value, shape, datatype = 'i32') {
        return new NDArray(this.functions[datatype].full(value, this.numas.helper.createShape(shape)), datatype)
    }
}

module.exports = Factory
