const builder = require('../builder')
const datatypes = require('./datatypes')

const functionList = [
    'sqrt',
    'sum', 'prod',
    'loge', 'log', 'log2', 'log10',
    'round', 'ceil', 'floor', 'trunc',
    'get', 'set', 'collect',
    'free', 'len', 'clone', 'view', 'new', 'baseLen', 'shape', 'reshape',
    'add', 'addAssign', 'sub', 'subAssign', 'mul', 'mulAssign', 'div', 'divAssign',
    'eq', 'neq', 'le', 'lt', 'ge', 'gt',
    'sin', 'cos', 'tan', 'arcsin', 'arccos', 'arctan', 'degrees', 'radians',
    'sinh', 'cosh', 'tanh', 'arcsinh', 'arccosh', 'arctanh',
]

const prototypes = {}

for (type in datatypes.DATATYPES) {
    prototypes[type] = {}
}

builder.addCallback(mod => {
    let functions = mod.functions
    
    for (type in datatypes.DATATYPES) {
        for (fn of functionList) {
            prototypes[type][fn] = functions[fn + '_' + type]
        }
    }
})



const getPrototype = type => prototypes[type]

module.exports = {
    getPrototype,
}
