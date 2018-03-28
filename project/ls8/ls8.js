const readline = require('readline');
const fs = require('fs');
const RAM = require('./ram');
const CPU = require('./cpu');
/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory(cpu, filename) {
  // Load the program into the CPU's memory a byte at a time
  // for (let i = 0; i < program.length; i++) {
  //   cpu.poke(i, parseInt(program[i], 2));
  // }
  let lineReader = readline.createInterface({
    input: fs.createReadStream(filename)
  });

  let address = 0;

  lineReader.on('line', (line) => {

    let str = line.split('#')[0].slice(0, 8);

    let byte = parseInt(str, 2);

    if (!isNaN(byte)) {
      cpu.poke(address++, byte);
    }
  });

  lineReader.on('close', () => {
    cpu.startClock();
  });
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

if (process.argv.length !== 3) {
  console.log('usage: node ls8 <filename>')
  process.exit(1);
};

loadMemory(cpu, process.argv[2]);
