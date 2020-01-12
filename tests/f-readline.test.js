const fs = require('fs');
const util = require('util');
const test = require('tape');
const FReadLine = require('../f-readline.js');

function newFRL(filename = "./tests/gettysburg.txt") {
  let readStream = fs.createReadStream("./tests/gettysburg.txt");
  return new FReadLine(readStream);
}


test("filter only empty lines", function(t) {
  let frl = newFRL();
  
  frl.filter((l) => !l.length)
    .then((lines) => {
      t.equals(lines.toString(), ",");  // 2 empty lines
      t.end();
    });
});


test("map linecount", function(t) {
  let frl = newFRL();

  frl.map((l) => l)
    .then((lines) => {
      t.equals(lines.length, 10);
      t.end();
    });
});

test("reduce character count", function(t) {
  let frl = newFRL();

  frl.reduce((acc, l) => {
    acc += l.length;
    return acc;
  }, 0)
    .then((acc) => {
      t.equals(acc, 1298);
      t.end();
    });
});

test("foreach cumulative line count", function(t) {
  let frl = newFRL();
  let count = 0;

  frl.forEach((l, idx) => count += idx)
    .then(() => {
      t.equals(count, 45);  // 10 lines, but sum of [0..9] = 45
      t.end();
    });
});

test("getAllLines", function(t) {
  let frl = newFRL();

  frl.getAllLines()
    .then((lines) => {
      t.equals(lines.length, 10);
      t.equals(lines[8], '');
      t.end();
    });
});

