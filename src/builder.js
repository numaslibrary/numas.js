let func = null
let mod = null

const buildModule = wasmModule => {
    mod = wasmModule
    func = wasmModule.instance.exports
} 

module.exports = {
    buildModule,
}