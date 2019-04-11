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

    /**
     * Applies sine on elements from given array and creates new array
     * 
     * @returns {NArray}
     */
    sin() {
        return new NArray(this.prototype.sin(this.pointer), 'f64')
    }

    /**
     * Applies cosine on elements from given array and creates new array
     * 
     * @returns {NArray}
     */
    cos() {
        return new NArray(this.prototype.cos(this.pointer), 'f64')
    }

    /**
     * Applies inverse sine on elements from given array and creates new array
     * 
     * @returns {NArray}
     */
    arcsin() {
        return new NArray(this.prototype.arcsin(this.pointer), 'f64')
    }

    /**
     * Applies inverse cosine on elements from given array and creates new array
     * 
     * @returns {NArray}
     */
    arccos() {
        return new NArray(this.prototype.arccos(this.pointer), 'f64')
    }

    /**
     * Applies inverse tangent on elements from given array and creates new array
     * 
     * @returns {NArray}
     */
    arctan() {
        return new NArray(this.prototype.arctan(this.pointer), 'f64')
    }

    /**
     * Converts elements from given array to degrees and creates new array
     * 
     * @returns {NArray}
     */
    degrees() {
        return new NArray(this.prototype.degrees(this.pointer), 'f64')
    }

    /**
     * Converts elements from given array to radians and creates new array
     * 
     * @returns {NArray}
     */
    radians() {
        return new NArray(this.prototype.radians(this.pointer), 'f64')
    }

    /**
     * Converts elements from given array to degrees and creates new array
     * 
     * @returns {NArray}
     */
    rad2deg() {
        return new NArray(this.prototype.degrees(this.pointer), 'f64')
    }

    /**
     * Converts elements from given array to radians and creates new array
     * 
     * @returns {NArray}
     */
    deg2rad() {
        return new NArray(this.prototype.radians(this.pointer), 'f64')
    }
}

module.exports = NArray
