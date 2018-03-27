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
        switch (op) {
            case 'MUL':
                // !!! IMPLEMENT ME
                break;
        }
    }

    /**
     * Advances the CPU one cycle
     */
    tick() {
        // CREATE BRANCH TABLE OR HASH
        const LDI = '10011001';
        const PRN = '01000011';
        const HLT = '00000001';

        // setTable[LDI] = execution of the instruction
            //  poke(opA, opB)
        // Load the instruction register (IR--can just be a local variable here)
        // from the memory address pointed to by the PC. (I.e. the PC holds the
        // index into memory of the next instruction.)

        // !!! IMPLEMENT ME

        let IR = this.ram.read(this.reg.PC.toString(2))
        console.log(IR)

        // Debugging output
        console.log(`${this.reg.PC}: ${IR.toString(2)}`);

        // Get the two bytes in memory _after_ the PC in case the instruction
        // needs them.

        // !!! IMPLEMENT ME

        let opA = this.ram.read(this.reg.PC + 1);
        let opB = this.ram.read(this.reg.PC + 2);
        console.log(opA, opB)

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

/* Pseudocode, not valid JS:

const LDI = 0b10011001; // From the LS-8 spec
const HLT = 0b00000001;

function handle_LDI() { ... }
function handle_HLT() { ... }

branchTable[LDI] = handle_LDI;
branchTable[HLT] = handle_HLT;

let IR = this.mem.read(this.reg.PC); // Fetch instruction
let handler = branchTable[IR]; // Look up handler in branch table

handler(); // Call it

 etc.// Pseudocode, not valid JS:

const LDI = 0b10011001; // From the LS-8 spec
const HLT = 0b00000001;

function handle_LDI() { ... }
function handle_HLT() { ... }

branchTable[LDI] = handle_LDI;
branchTable[HLT] = handle_HLT;

let IR = this.mem.read(this.reg.PC); // Fetch instruction
let handler = branchTable[IR]; // Look up handler in branch table

handler(); // Call it
etc.
*/



module.exports = CPU;
