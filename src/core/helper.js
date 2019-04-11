class Helper {
    constructor(wasmModule) {
        this.wasmModule = wasmModule
    }

    /**
     * Initialize new shape vector in WebAssembly memory and return its pointer
     * 
     * @param {Object} wasmModule WebAssembly module
     * @return {number}
     */
    createShape(shape) {
        let len = shape.length
        let ptr = this.wasmModule.functions.instantiate_shape_array(len)    
        let tmp = new Int32Array(this.wasmModule.memory.buffer, ptr, 1)
        tmp = new Int32Array(this.wasmModule.memory.buffer, tmp[0], len)
        tmp.set(shape, 0)
        return ptr
    }
}

module.exports = Helper
