const datatypes = require('../metadata/datatypes')
const NArray = require('./array')

class Factory {
    /**
     * Initialized new factory intance
     * 
     * @param {Object} wasmModule WebAssembly module
     * @param {Object} numas
     */
    constructor(wasmModule, numas) {
        let functions = ['ones', 'zeros', 'fill']
    
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
     * @return {NArray}
     */
    ones(shape, datatype = 'i32') {
        return new NArray(this.functions[datatype].ones(this.numas.helper.createShape(shape)), datatype)
    }

    /**
     * Creates new array filled with zeros
     * 
     * @param {Array} shape Shape of array
     * @param {string} datatype Datatype
     */
    zeros(shape, datatype = 'i32') {
        return new NArray(this.functions[datatype].zeros(this.numas.helper.createShape(shape)), datatype)
    }

    /**
     * Creates new array filled with zeroes
     * 
     * @param {Array} shape Shape of array
     * @param {string} datatype Datatype
     * @return {NArray}
     */
    zeroes(shape, datatype = 'i32') {
        return new NArray(this.functions[datatype].zeros(this.numas.helper.createShape(shape)), datatype)
    }

    /**
     * Creates new array filled with given value
     * 
     * @param {Array} shape Shape of array
     * @param {string} datatype Datatype
     * @return {NArray}
     */
    full(value, shape, datatype = 'i32') {
        return new NArray(this.functions[datatype].full(value, this.numas.helper.createShape(shape)), datatype)
    }
}

module.exports = Factory
