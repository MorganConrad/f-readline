[![Build Status](https://secure.travis-ci.org/MorganConrad/f-readline.png)](http://travis-ci.org/MorganConrad/f-readline)
[![License](http://img.shields.io/badge/license-MIT-A31F34.svg)](https://github.com/MorganConrad/f-readline)
[![NPM Downloads](http://img.shields.io/npm/dm/f-readline.svg)](https://www.npmjs.org/package/f-readline)
[![Known Vulnerabilities](https://snyk.io/test/github/morganconrad/f-readline/badge.svg)](https://snyk.io/test/github/morganconrad/f-readline)
[![Coverage Status](https://coveralls.io/repos/github/MorganConrad/f-readline/badge.svg)](https://coveralls.io/github/MorganConrad/f-readline)

# f-readline
A thin layer over [node's readline](https://nodejs.org/api/readline.html) to provide functional programming
 - filter(), forEach(), map(), reduce()
 - also provides a convenient getAllLines()


## Basic API

**Note:** Other than the constructor, all methods are **async**.

### constructor(readable, interfaceOptions)   constructor
 - readable is the stream to be read
 - interfaceOptions (optional, default = {}) will be passed to [readline.createInterface(interfaceOptions)](https://nodejs.org/api/readline.html#readline_readline_createinterface_options)
   - crlfDelay defaults to 999999
   - input is set to the `readable` argument


### async getAllLines()
Convenience method to just provide an array of all the lines.  Obviously it must all fit in memory!

## Functional API
The "functional" methods below accept a user function (or "predicate") **fn** as their first argument.  This method is usually called with three arguments:
 - the line
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

#### Since readline is clever on memory (?), this may save on memory
 - if you are just counting lines or characters
 - if you are filtering just a small subset of the input

#### What good is the 3rd argument to `fn()`?

 - The interfaceOptions are available in `.interfaceOptions`
 - The created interface is available in `.rl`
 - If you want to pass other client specific info to **fn**, just add it to the FReadLine instance, _e.g._

```js
let frl = new FReadLine(readable, interfaceOptions);
frl.clientData = { your data here };

// then, during the call to fn(), you could access those

fn(line, index, frl) {
  do something with frl.clientData
}
```

#### This module has nothing to do with prompting the user, pausing the input, etc.  Just reading a stream line by line.
