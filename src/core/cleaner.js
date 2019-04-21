let checkpoints = [[]]
let currentCheckpoint = 0

/**
 * Starts new checkpoint
 * 
 * @returns {void}
 */
const startCheckpoint = () => {
    currentCheckpoint++

    if (!Array.isArray(checkpoints[currentCheckpoint])) {
        checkpoints[currentCheckpoint] = []
    }

    return currentCheckpoint
}

/**
 * Returns current checkpoint id
 * 
 * @returns {number}
 */
const getCurrentCheckpoint = () => currentCheckpoint

/**
 * Free NDArray instances in WebAssembly memory created in checkpoint with given id 
 * 
 * @param {number} checkpoint 
 */
const freeCheckpoint = checkpoint => {
    while (checkpoints[checkpoint].length !== 0) {
        let array = checkpoints[checkpoint].pop()
        console.log(array.pointer)
        array.free()
    }
}

/**
 * Free NDArray instances in WebAssembly memory created in current checkpoint
 */
const freeCurrentCheckpoint = () => freeCheckpoint(currentCheckpoint)

/**
 * Switch back to main checkpoint and free memory (optional)
 * 
 * @param {Boolean} free True if free memory 
 */
const endCheckpoint = (free = true) => {
    if (free) {
        freeCheckpoint(currentCheckpoint)
    }

    currentCheckpoint = 0
}

/**
 * Remove NDArray
 * s
 * @param {NDArray} array 
 */
const removeArray = array => {
    for (let checkpoint in checkpoints) {
        for (let index in checkpoints[checkpoint]) {
            if (checkpoints[checkpoint][index] === array) {
                checkpoints[checkpoint].slice(index, 1)
                return
            } 
        }
    }
}

/**
 * Add NDArray into checkpoint
 * 
 * @param {NDArray} array 
 */
const addArray = array => checkpoints[currentCheckpoint].push(array)

module.exports = {
    startCheckpoint,
    endCheckpoint,
    getCurrentCheckpoint,
    freeCheckpoint,
    freeCurrentCheckpoint,
    addArray,
    removeArray,
}
