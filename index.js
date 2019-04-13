const nodeLoader = require('./src/loaders/nodeLoader')
const classicInstancer = require('./src/instancers/classic')
const builder = require('./src/builder')
const numas = require('./src/core/numas')

const defaultNode = {
    instancer: classicInstancer,
    loader: nodeLoader.loadAsync,
    path: './node_modules/numas.wasm/numas.wasm'
}

const init = (callback, config = {}) => {
    const { instancer, loader, path } = { ...defaultNode, ...config }
    
    builder.addCallback(callback)
    instancer.instantiate(loader(path)).then(builder.buildModule)
}

module.exports = {
    numas,
    init,
    config: {
        defaultNode,
    },
}
