JSBP.core = {};

JSBP.core.load = function() {
    // We add 8 bytes to avoid overflows
    JSBP.mem = new Uint8ArrayBuffer(0x1000008);
}

JSBP.core.update = function() {
    // Fetch the 3-byte program counter from adress 2
    var pc = JSBP.mem[2]<<16 | JSBP.mem[3]<<8 | JSBP.mem[4];
    var a, b, c;

    var i = 0xA0000;
    while (--i)
    {
        // Fetch the 9-byte opcode from the current PC adress
        a = JSBP.mem[pc]<<16 | JSBP.mem[pc+1]<<8 | JSBP.mem[pc+2];
        b = JSBP.mem[pc+3]<<16 | JSBP.mem[pc+4]<<8 | JSBP.mem[pc+5];
        c = JSBP.mem[pc+6]<<16 | JSBP.mem[pc+7]<<8 | JSBP.mem[pc+8];

        // Copy the value at adress a to adress b
        JSBP.mem[b] = JSBP.mem[a];

        // Jump to adress c
        pc = c;
    }
}
