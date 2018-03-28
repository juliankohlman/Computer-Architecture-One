/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {
  /**
   * Initialize the CPU
   */
  constructor(ram) {
    this.ram = ram;

    this.reg = new Array(8).fill(0); // General-purpose registers R0-R7

    // Special-purpose registers
    this.reg.PC = 0; // Program Counter
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
    let result = 0;
    switch (op) {
      case 'MUL':
        // console.log(result);
        this.reg[regA] = regA * regB
        console.log(this.reg[regA]);
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
    // opcodes
    const LDI = 0b10011001;
    const HLT = 0b00000001;
    const PRN = 0b01000011;
    const ADD = 0b10101000;
    const MUL = 0b10101010;

    // IR >>> 6 + 1<-- for opcode
    //           ^^ operands + 1 10 in binary is 2 | 2 + 1 = 3
    let IR = this.ram.read(this.reg.PC)

    let opA = this.ram.read(this.reg.PC + 1);
    let opB = this.ram.read(this.reg.PC + 2);

    let handleLDI = () => this.reg[opA] = opB;
    let handlePRN = () => console.log(this.reg[opA]);
    let handleHLT = () => this.stopClock();
    // let handleMUL = () => console.log(this.reg[opA], this.reg[opB]);
    let handleMUL = () => this.alu('MUL',this.reg[opA], this.reg[opB]);

    let table = {}

    table[LDI] = handleLDI;
    table[HLT] = handleHLT;
    table[PRN] = handlePRN;
    table[MUL] = handleMUL;

    let handler = table[IR]; // add default unknown instruction msg.

    // EXECUTE INSTRUCTIONS
    handler();

    // INCREMENT PC REGISTER
    this.reg.PC += (IR >>> 6) + 1

    // Load the instruction register (IR--can just be a local variable here)
    // from the memory address pointed to by the PC. (I.e. the PC holds the
    // index into memory of the next instruction.)

    // !!! IMPLEMENT ME

    // Debugging output
    console.log(`${this.reg.PC}: ${IR.toString(2)}`);

    // Get the two bytes in memory _after_ the PC in case the instruction
    // needs them.

    // !!! IMPLEMENT ME

    // instruction handlers
    // Execute the instruction. Perform the actions for the instruction as
    // outlined in the LS-8 spec.

    // !!! IMPLEMENT ME

    // Increment the PC register to go to the next instruction. Instructions
    // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
    // instruction byte tells you how many bytes follow the instruction byte
    // for any particular instruction.

    // !!! IMPLEMENT ME
  }
}

module.exports = CPU;