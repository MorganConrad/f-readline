[![Build Status](https://secure.travis-ci.org/MorganConrad/f-readline.png)](http://travis-ci.org/MorganConrad/f-readline)
[![License](http://img.shields.io/badge/license-MIT-A31F34.svg)](https://github.com/MorganConrad/f-readline)
[![NPM Downloads](http://img.shields.io/npm/dm/f-readline.svg)](https://www.npmjs.org/package/f-readline)
[![Known Vulnerabilities](https://snyk.io/test/github/morganconrad/f-readline/badge.svg)](https://snyk.io/test/github/morganconrad/f-readline)
[![Coverage Status](https://coveralls.io/repos/github/MorganConrad/f-readline/badge.svg)](https://coveralls.io/github/MorganConrad/f-readline)

# f-readline
A thin layer over [node's readline](https://nodejs.org/api/readline.html) to provide functional programming 
 - filter(), forEach(), map(), reduce()
 - also provides a convenient getAllLines()

Since readline is clever on memory (?), this may save on memory, depending on your usage and the size of the stream.

## Basic API

**Note:** Other than the constructor, all methods are **async**.
 
### constructor(readable, interfaceOptions)   constructor
 - readable is the stream to be read
 - interfaceOptions will be passed to [readline.createInterface(options)](https://nodejs.org/api/readline.html#readline_readline_createinterface_options)
   - crlfDelay defaults to 999999
   - input is set to the `readable` argument


### async getAllLines()
Convenience method to just provide an array of all the lines.  Obviously it must all fit in memory!    

## Functional API
The "functional" methods below accept a user function (or "predicate") **fn** as their first argument.  This method is usually called with three arguments:
 - the value (the line from the file)
 - the line count (starting at 0)
 - the instance of f-readline.  Generally useless but see notes at end

### async filter(fn)
Returns an array of all lines passing the predicate `fn(line, index, this)`

### async forEach(fn)
Calls `fn(line, index, this)` for each line.

### async map(fn)
Returns an array obtained by calling `fn(line, index, this)` for each line

### async reduce(fn, acc)
Reduces using `fn(acc, line, idx++, this)`


### Notes, Todos, and  Caveats

The construtor stores interfaceOptions in a `.options` field, so they are accessible later.  So, you _could_ pass in your own options, say as 

```js
let interfaceOptions = {
  ... any "real" interfaceOptions,
  mySpecialOptions: {
    ...
  }
}

let frl = new FReadLine(readable, interfaceOptions);

// then, during the call to fn(), you could access those

fn(line, index, frl) {
  do something with frl.options.mySpecialOptions
}
```
