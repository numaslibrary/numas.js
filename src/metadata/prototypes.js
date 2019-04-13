const builder = require('../builder')
const datatypes = require('./datatypes')

let functions = {}
const functionList = [
    'free', 'len', 'clone', 'view', 'new', 'baseLen',
    'sin', 'cos', 'arcsin', 'arccos', 'arctan', 'degrees', 'radians',
]

builder.addCallback(mod => {
    functions = mod.functions
    
    for (type in datatypes.DATATYPES) {
        for (fn of functionList) {
            prototypes[type][fn] = functions[fn + '_' + type]
        }
    }
})

const u8 = {}
const u16 = {}
const i16 = {}
const u32 = {}
const i32 = {}
const f32 = {}
const f64 = {}

const prototypes = {
    u8, u16, i16, u32, i32, f32, f64,
}

const getPrototype = type => prototypes[type]

module.exports = {
    getPrototype,
}
