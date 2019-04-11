const builder = require('../builder')
const datatypes = require('./datatypes')


const functionList = [
    'free', 'len', 'clone', 'view',
    'sin', 'cos', 'arcsin', 'arccos', 'arctan', 'degrees', 'radians',
]
functions = {}


builder.addCallback(mod => {
    functions = mod.functions
    
    for (type in datatypes.DATATYPES) {
        for (fn of functionList) {
            prototypes[type][fn] = functions[fn + '_' + type]
        }
    }
})

const i32 = {}
const f32 = {}
const f64 = {}
const u32 = {}

const prototypes = {
    i32, f32, f64, u32
}

const getPrototype = type => prototypes[type]

module.exports = {
    getPrototype,
}
