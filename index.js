const nodeLoader = require('./src/loaders/nodeLoader')
const classicInstancer = require('./src/instancers/classic')
const builder = require('./src/builder')

const loader = nodeLoader.loadSync('./node_modules/numas.wasm/numas.wasm')
classicInstancer.instantiate(loader).then(builder.buildModule)


