# numas.js

`numas.js` is JavaScript numeric library implementing interface for `numas` (`numas.wasm`).

## Usage

### Initialize numas
It's important to initialize numas first by calling `init`
```js
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

