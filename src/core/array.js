const datatypes = require('../metadata/datatypes').DATATYPES
const prototypes = require('../metadata/prototypes')
const helper = require('./helper')


class NDArray {
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
     * @returns {NDArray}
     */
    static new(data, shape, datatype = 'i32') {
        if (!datatypes.hasOwnProperty(type)) {
            throw 'Invalid datatype provided'
        }

        const helperInstance = helper.getHelper()

        const shapePtr = helperInstance.createShape(shape)
        const dataPtr = helperInstance.createVector(data, datatype)
        const ptr = prototypes.getPrototype(datatype).new(dataPtr, shapePtr)
        
        return new NDArray(ptr, datatype)
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
     * @returns {NDArray}
     */
    clone() {
        return new NDArray(this.prototype.clone(this.pointer), this.type)
    }
    
    /**
     * Returns view into array
     * 
     * @returns {NDArray}
     */
    view() {
        return new NDArray(this.prototype.view(this.pointer), this.type)
    }

    /**
     * Adds array
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    add(other) {
        return new NDArray(this.prototype.add(this.pointer, other.pointer), this.type)
    }

    /**
     * Adds array
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    addAssign(other) {
        this.prototype.addAssign(this.pointer, other.pointer)
        
        return this
    }
    
    /**
     * Subtracts array
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    sub(other) {
        return new NDArray(this.prototype.sub(this.pointer, other.pointer), this.type)
    }

    /**
     * Subtracts array
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    subAssign(other) {
        this.prototype.subAssign(this.pointer, other.pointer)
        
        return this
    }

    /**
     * Multiplies array
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    mul(other) {
        return new NDArray(this.prototype.mul(this.pointer, other.pointer), this.type)
    }

    /**
     * Multiplies array
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    mulAssign(other) {
        this.prototype.mulAssign(this.pointer, other.pointer)
        
        return this
    }

    /**
     * Returns array of 1s and 0s representing truth value equality element wise
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    eq(other) {
        return new NDArray(this.prototype.eq(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value not equality element wise
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    neq(other) {
        return new NDArray(this.prototype.neq(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value of lesser than element wise
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    lt(other) {
        return new NDArray(this.prototype.lt(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value of greater than element wise
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    gt(other) {
        return new NDArray(this.prototype.gt(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value of lesser or equal element wise
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    le(other) {
        return new NDArray(this.prototype.le(this.pointer, other.pointer), 'u8')
    }

    /**
     * Returns array of 1s and 0s representing truth value of greater or equal element wise
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    ge(other) {
        return new NDArray(this.prototype.le(this.pointer, other.pointer), 'u8')
    }

    /**
     * Divides array
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    div(other) {
        return new NDArray(this.prototype.div(this.pointer, other.pointer), this.type)
    }

    /**
     * Divides array
     * 
     * @param {NDArray} other Other array
     * @returns {NDArray}
     */
    subAssign(other) {
        this.prototype.divAssign(this.pointer, other.pointer)
        
        return this
    }

    /**
     * Applies sine on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    sin() {
        return new NDArray(this.prototype.sin(this.pointer), 'f64')
    }

    /**
     * Applies cosine on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    cos() {
        return new NDArray(this.prototype.cos(this.pointer), 'f64')
    }

    /**
     * Applies inverse sine on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    arcsin() {
        return new NDArray(this.prototype.arcsin(this.pointer), 'f64')
    }

    /**
     * Applies inverse cosine on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    arccos() {
        return new NDArray(this.prototype.arccos(this.pointer), 'f64')
    }

    /**
     * Applies inverse tangent on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    arctan() {
        return new NDArray(this.prototype.arctan(this.pointer), 'f64')
    }

    /**
     * Converts elements from given array to degrees and creates new array
     * 
     * @returns {NDArray}
     */
    degrees() {
        return new NDArray(this.prototype.degrees(this.pointer), 'f64')
    }

    /**
     * Converts elements from given array to radians and creates new array
     * 
     * @returns {NDArray}
     */
    radians() {
        return new NDArray(this.prototype.radians(this.pointer), 'f64')
    }

    /**
     * Converts elements from given array to degrees and creates new array
     * 
     * @returns {NDArray}
     */
    rad2deg() {
        return new NDArray(this.prototype.degrees(this.pointer), 'f64')
    }

    /**
     * Converts elements from given array to radians and creates new array
     * 
     * @returns {NDArray}
     */
    deg2rad() {
        return new NDArray(this.prototype.radians(this.pointer), 'f64')
    }


}

module.exports = NDArray
