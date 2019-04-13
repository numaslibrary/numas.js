const datatypes = require('../metadata/datatypes').DATATYPES
const prototypes = require('../metadata/prototypes')
const helper = require('./helper')


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
     * @param {string} datatype Type of array
     * @returns {NArray}
     */
    static new(data, shape, datatype) {
        if (!datatypes.hasOwnProperty(type)) {
            throw 'Invalid datatype provided'
        }

        const helperInstance = helper.getHelper()

        const shapePtr = helperInstance.createShape(shape)
        const dataPtr = helperInstance.createVector(data, datatype)
        const ptr = prototypes.getPrototype(datatype).new(dataPtr, shapePtr)
        
        return new NArray(ptr, datatype)
    }

    /**
     * Frees allocated memory for this array
     * 
     * @returns {number}
     */
    free() {
        return this.prototype.free(this.pointer)
    }

    /**
     * Get type of array
     * 
     * @returns {string}
     */
    type() {
        return this.type
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
     * Returns length of base data
     * 
     * @returns {number}
     */
    baseLen() {
        return this.prototype.baseLen(this.pointer)
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
     * Adds array
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    add(other) {
        return new NArray(this.prototype.add(this.pointer, other.pointer), this.type)
    }

    /**
     * Adds array
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    addAssign(other) {
        this.prototype.addAssign(this.pointer, other.pointer)
        
        return this
    }
    
    /**
     * Subtracts array
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    sub(other) {
        return new NArray(this.prototype.sub(this.pointer, other.pointer), this.type)
    }

    /**
     * Subtracts array
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    subAssign(other) {
        this.prototype.subAssign(this.pointer, other.pointer)
        
        return this
    }

    /**
     * Multiplies array
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    mul(other) {
        return new NArray(this.prototype.mul(this.pointer, other.pointer), this.type)
    }

    /**
     * Multiplies array
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    mulAssign(other) {
        this.prototype.mulAssign(this.pointer, other.pointer)
        
        return this
    }

    /**
     * Returns array of 1s and 0s representing truth value equality element wise
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    eq(other) {
        return new NArray(this.prototype.eq(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value not equality element wise
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    neq(other) {
        return new NArray(this.prototype.neq(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value of lesser than element wise
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    lt(other) {
        return new NArray(this.prototype.lt(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value of greater than element wise
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    gt(other) {
        return new NArray(this.prototype.gt(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value of lesser or equal element wise
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    le(other) {
        return new NArray(this.prototype.le(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value of greater or equal element wise
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    ge(other) {
        return new NArray(this.prototype.le(this.pointer, other.pointer), 'u8')
    }

    /**
     * Divides array
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    div(other) {
        return new NArray(this.prototype.div(this.pointer, other.pointer), this.type)
    }

    /**
     * Divides array
     * 
     * @param {NArray} other Other array
     * @returns {NArray}
     */
    subAssign(other) {
        this.prototype.divAssign(this.pointer, other.pointer)
        
        return this
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
