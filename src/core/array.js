const datatypes = require('../metadata/datatypes').DATATYPES
const prototypes = require('../metadata/prototypes')
const helper = require('./helper')
const cleaner = require('./cleaner')


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

        cleaner.addArray(this)
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
     * Changes shape of the array
     * 
     * @param {Array} shape New shape
     * @returns {NDArray}
     */
    reshape(shape) {
        const helperInstance = helper.getHelper()
        const shapePtr = helperInstance.createShape(shape)
        
        this.prototype.reshape(this.pointer, shapePtr)

        return this
    }

    /**
     * Returns shape of the array
     * 
     * @returns {Array}
     */
    shape() {
        const helperInstance = helper.getHelper()
        const shapePtr = this.prototype.shape(this.pointer)
        const length = helperInstance.getVectorLength(shapePtr)

        return helperInstance.vectorToArray(shapePtr, length, 'i32')
    }

    /**
     * Collects NDArray into TypedArray
     * 
     * @returns {Array}
     */
    collect() {
        const helperInstance = helper.getHelper()
        const ptr = this.prototype.collect(this.pointer) 
        const len = this.prototype.len(this.pointer)

        return helperInstance.vectorToArray(ptr, len, this.type)
    }

    /**
     * Get new NDArray from slice
     * 
     * @param {Array} indices Indices
     * @returns {NDArray}
     */
    get(indices) {
        const helperInstance = helper.getHelper()
        const indicesPtr = helperInstance.createIndices(indices)

        const pointer = this.prototype.get(this.pointer, indicesPtr) 

        return new NDArray(pointer, this.type)
    }

    /**
     * Set values of array on given indices to value
     * 
     * @param {Number} value Value
     * @param {Array} indices Indices
     * @returns {void}
     */
    set(value, indices) {
        const helperInstance = helper.getHelper()
        const indicesPtr = helperInstance.createIndices(indices)

        this.prototype.set(this.pointer, indicesPtr, value) 
    }

    /**
     * Frees allocated memory for this array
     * 
     * @returns {number}
     */
    free() {
        cleaner.removeArray(this)
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
    divAssign(other) {
        this.prototype.divAssign(this.pointer, other.pointer)
        
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
     * Applies tangent on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    tan() {
        return new NDArray(this.prototype.tan(this.pointer), 'f64')
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

    /**
     * Applies square root on every element and return new array
     * 
     * @returns {NDArray}
     */
    sqrt() {
        return new NDArray(this.prototype.sqrt(this.pointer), 'f64')
    }

    /**
     * Applies natural logarithm on every element and return new array
     * 
     * @returns {NDArray}
     */
    loge() {
        return new NDArray(this.prototype.loge(this.pointer), 'f64')
    }

    /**
     * Applies logarithm with base 2 on every element and return new array
     * 
     * @returns {NDArray}
     */
    log2() {
        return new NDArray(this.prototype.log2(this.pointer), 'f64')
    }

    /**
     * Applies logarithm with base 10 on every element and return new array
     * 
     * @returns {NDArray}
     */
    log10() {
        return new NDArray(this.prototype.log10(this.pointer), 'f64')
    }

    /**
     * Applies logarithm with given base on every element and return new array
     *
     * @param {number} base Base of logartihm 
     * @returns {NDArray}
     */
    log(base) {
        return new NDArray(this.prototype.log(this.pointer, base), 'f64')
    }

    /**
     * Returns sum of all elements of array
     * 
     * @returns {number}
     */
    sum() {
        return this.prototype.sum(this.pointer)
    }

    /**
     * Returns product of all elements of array
     * 
     * @returns {number}
     */
    prod() {
        return this.prototype.prod(this.pointer)
    }

    /**
     * Applies rounding on elements from given array and creates new array
     *
     * @param {number} base Base of logartihm 
     * @returns {NDArray}
     */
    round(base) {
        return new NDArray(this.prototype.round(this.pointer, base), 'f64')
    }

    /**
     * Applies round floor on elements from given array and creates new array
     *
     * @param {number} base Base of logartihm 
     * @returns {NDArray}
     */
    floor(base) {
        return new NDArray(this.prototype.floor(this.pointer, base), 'f64')
    }

    /**
     * Applies round ceil on elements from given array and creates new array
     *
     * @param {number} base Base of logartihm 
     * @returns {NDArray}
     */
    ceil(base) {
        return new NDArray(this.prototype.ceil(this.pointer, base), 'f64')
    }

    /**
     * Applies truncating on elements from given array and creates new array
     *
     * @param {number} base Base of logartihm 
     * @returns {NDArray}
     */
    trunc(base) {
        return new NDArray(this.prototype.trunc(this.pointer, base), 'f64')
    }

    /**
     * Applies hyperbolic sine on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    sinh() {
        return new NDArray(this.prototype.sinh(this.pointer), 'f64')
    }

    /**
     * Applies hyperbolic cosine on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    cosh() {
        return new NDArray(this.prototype.cosh(this.pointer), 'f64')
    }

    /**
     * Applies hyperbolic tangent on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    tanh() {
        return new NDArray(this.prototype.tanh(this.pointer), 'f64')
    }

    /**
     * Applies inverse hyperbolic sine on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    arcsinh() {
        return new NDArray(this.prototype.arcsinh(this.pointer), 'f64')
    }

    /**
     * Applies inverse hyperbolic cosine on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    arccosh() {
        return new NDArray(this.prototype.arccosh(this.pointer), 'f64')
    }

    /**
     * Applies inverse hyperbolic tangent on elements from given array and creates new array
     * 
     * @returns {NDArray}
     */
    arctanh() {
        return new NDArray(this.prototype.arctanh(this.pointer), 'f64')
    }
}

module.exports = NDArray
