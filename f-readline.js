const readline = require('readline');

class FReadLine {

  constructor(readable, interfaceOptions = {}) {
    interfaceOptions.crlfDelay = interfaceOptions.crlfDelay || 999999;
    interfaceOptions.input = readable;
    this.options = interfaceOptions;  // save in case something is useful later.
    this.rl = readline.createInterface(interfaceOptions);
  }


  async filter(fn) {
    let result = [];
    let idx = 0;
    for await (const line of this.rl)
      if (fn(line, idx++, this))
        result.push(line);
    
    return result;
  }
  
  
  async forEach(fn) {
    let idx = 0;
    for await (const line of this.rl)
      fn(line, idx++, this);
  }


  async map(fn) {
    let result = [];
    let idx = 0;
    for await (const line of this.rl)
      result.push(fn(line, idx++, this));

    return result;
  }


  async reduce(fn, acc) {
    let idx = 0;
    for await (const line of this.rl)
      acc = fn(acc, line, idx++, this);

    return acc;
  }
  
  /**
    Convenience, just grab all lines into an array
  */
  async getAllLines() {
    return await this.map((l) => l);
  }

}

module.exports = FReadLine;
