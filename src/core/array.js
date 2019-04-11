const datatypes = require('../metadata/datatypes').DATATYPES
const prototypes = require('../metadata/prototypes')


class NArray {
    /**
     * Initialized new numas array
     * 
     * @param {number} pointer Pointer into linear memory
     * @param {string} type Type string representation
     * @returns {void}
     */
    constructor(pointer, type) {
        if (!datatypes.hasOwnProperty(type)) {
            throw 'Invalid datatype provided'
        }

        /** @private */
        this.pointer = pointer

        /** @private */
        this.type = type

        /** @private */
        this.prototype = prototypes.getPrototype(type)
    }

    /**
     * Creates new array with given data and shape
     * 
     * @param {Array} data Data in array
     * @param {Array} shape Shape of array
     * @returns {NArray}
     */
    static new(data, shape) {
        
    }

    /**
     * Returns length of array
     * 
     * @returns {number}
     */
    len() {
        return this.prototype.len(this.pointer)
    }

    /**
     * Returns cloned array
     * 
     * @returns {NArray}
     */
    clone() {
        return new NArray(this.prototype.clone(this.pointer), this.type)
    }
    
    /**
     * Returns view into array
     * 
     * @returns {NArray}
     */
    view() {
        return new NArray(this.prototype.view(this.pointer), this.type)
    }
}

module.exports = NArray
