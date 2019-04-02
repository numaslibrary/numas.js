const fs = require('fs')

const loader = {
    loadAsync: (name) => () => new Promise((resolve, reject) => {
        fs.readFile(name, (error, data) => error ? reject(error) : resolve(data))
    }),

    loadSync: (name) => () => new Promise(resolve => {
        resolve(fs.readFileSync(name))
    })
}

module.exports = loader
