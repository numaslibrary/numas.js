# numas.js

`numas.js` is JavaScript numeric library implementing interface for `numas` (`numas.wasm`).

## Usage

### Initialize numas
It's important to initialize numas first by calling `init`
```js
const { numas, init } = require('numas')

init(() => {
    // work with numas
})

```

It's possible to set configuration for initialization, by default it is set to `numas.config.defaultNode`.

### Initializing array

Example of initializing array
```js
// creates two dimensional array of 6 elements of type i32
let array = numas.Array([1, 2, 3, 4, 5, 6], [2, 3], 'i32')

// creates two dimensional array of 9 elements filled with value 5
let filled = numas.factory.full(5, [3, 3])

// creates three dimensional array of 8 elements filled with zeros
let ones = numas.factory.ones([2, 2, 2], 'f64')

// etc.
```

Array can be also initialized by performing some operations like add, mul, sub, div, eq, neq, le, ge, etc.
```js

let first = numas.Array([1, 2], [2])
let second = numas.Array([1, 2], [2])

// performs addition of two arrays resulting in new array with elements [2, 4]
let third = first.add(second)
```

### Collecting array
To get values from array you need to perform collecting
```js
let array = numas.Array([1,2,3,4,5,6,7,8,9], [3, 3])
// ... some operations
let jsArray = array.get([1, [0,2]]) // Returns typed array [4, 5] (second row, first and second column)
```

### Garbage collection
To free up WebAssembly memory you need to call `free` method on instance of `NDArray`
```js
let array = numas.Array([1], [1])
array.free()
// Memory is free, do NOT use array instance...
```
Because that might be hard to manage with builder patter, there is checkpoint system.
Checkpoint system can free up arrays created in given checkpoint.
```js
// By default checkpoint id is 0
let array1 = numas.Array([1], [1])

numas.cleaner.startCheckpoint()
let array2 = numas.Array([1], [1])
// Frees array2
numas.cleaner.endCurrentCheckpoint()



let checkpointId = numas.cleaner.startCheckpoint()

let array3 = numas.Array([1], [1])
let array4 = numas.Array([2], [1])

// end checkpoint, dont free memory
numas.cleaner.endCurrentCheckpoint(false)
let array5 = array3.add(array4)

// Frees array3 and array4
// this way we can use result of some operations outside of checkpoint scope
numas.cleaner.freeCheckpoint(checkpointId)


// Frees array1 and array5
numas.cleaner.freeCurrentCheckpoint()
```

