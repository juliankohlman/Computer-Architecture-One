/* eslint semi: "error" */
/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
const LDI = 0b10011001;
const HLT = 0b00000001;
const PRN = 0b01000011;
const ADD = 0b10101000;
const MUL = 0b10101010;
const DEC = 0b01111001;
const INC = 0b01111000;
const POP = 0b01001100;
const PUSH = 0b01001101;
const CALL = 0b01001000;
const RET = 0b00001001;
const CMP = 0b10100000;
const JMP = 0b01010000;
const JEQ = 0b01010001;
const JNE = 0b01010010;
let SP = 7;

class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.reg.PC = 0; // Program Counter
    this.reg.FL = 0b00000000; // Flag
    this.reg[7] = 0xF4; // stack pointer
  }

  /**
   * Store value in memory address, useful for program loading
   */
  poke(address, value) {
    this.ram.write(address, value);
  }

  /**
   * Starts the clock ticking on the CPU
   */
  startClock() {
    const _this = this;

    this.clock = setInterval(() => {
      _this.tick();
    }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
  }

  /**
   * Stops the clock
   */
  stopClock() {
    clearInterval(this.clock);
  }

  /**
   * ALU functionality
   *
   * The ALU is responsible for math and comparisons.
   *
   * If you have an instruction that does math, i.e. MUL, the CPU would hand
   * it off to it's internal ALU component to do the actual work.
   *
   * op can be: ADD SUB MUL DIV INC DEC CMP
   */
  alu(op, regA, regB) {
    switch (op) {
      case 'MUL':
        this.reg[regA] = regA * regB;
        console.log(this.reg[regA]);
        break;
      case 'ADD':
        this.reg[regA] = regA + regB;
        console.log(this.reg[regA]);
        break;
      case 'DEC':
        this.reg[regA]--;
        break;
      case 'INC':
        this.reg[regA]++;
        break;
      default:
        console.log('def reached');
        break;
    }
  }

  /**
   * Advances the CPU one cycle
   */
  tick() {
    let IR = this.ram.read(this.reg.PC);
    let opA = this.ram.read(this.reg.PC + 1);
    let opB = this.ram.read(this.reg.PC + 2);

    // Handlers
    let handleLDI = () => this.reg[opA] = opB;
    let handlePRN = () => console.log(this.reg[opA]);
    let handleHLT = () => this.stopClock();
    let handleMUL = () => this.alu('MUL', this.reg[opA], this.reg[opB]);
    let handleADD = () => this.alu('ADD', this.reg[opA], this.reg[opB]);
    let handleDEC = () => this.alu('DEC', this.reg[opA]);
    let handleINC = () => this.alu('INC', this.reg[opA]);
    let handleCMP = () => this.alu('CMP', this.reg[opA], this.reg[opB]);
    let handleCALL = () => {
      this.reg[SP]--;
      this.ram.write(this.reg[SP], this.reg.PC + 2);
      this.reg.PC = this.reg[opA];
    };

    let handleRET = () => {
      this.reg.PC = this.ram.read(this.reg[SP]);
      this.reg[SP]++;
    };

    let handlePUSH = () => {
      this.reg[SP]--;
      this.poke(this.reg[SP], this.reg[opA]);
    };

    let handlePOP = () => {
      this.reg[opA] = this.ram.read(this.reg[SP]);
      this.reg[SP]++;
    };

    const table = {
      [LDI]: handleLDI,
      [HLT]: handleHLT,
      [PRN]: handlePRN,
      [MUL]: handleMUL,
      [ADD]: handleADD,
      [POP]: handlePOP,
      [PUSH]: handlePUSH,
      [DEC]: handleDEC,
      [INC]: handleINC,
      [CALL]: handleCALL,
      [RET]: handleRET,
      [CMP]: handleCMP,
      // [JMP]: handleJMP,
      // [JEQ]: handleJEQ,
      // [JNE]: handleJNE
    };

    let handler = table[IR] || console.log(`Error: Unknown Instruction | ${IR.toString(2)}`);

    handler();

    if (IR !== CALL && IR !== RET) this.reg.PC += (IR >>> 6) + 1;

    // Debugging output
    console.log(`${this.reg.PC}: ${IR.toString(2)}`);
  }
}

module.exports = CPU;