const builder = require('../builder')
const datatypes = require('./datatypes')


const functionList = ['len', 'clone', 'view']
functions = {}


builder.addCallback(mod => {
    functions = mod.functions
    
    for (fn of functionList) {
        for (type in datatypes.DATATYPES) {
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
