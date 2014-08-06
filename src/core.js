JSBP.core = {};

JSBP.core.first = true;

JSBP.core.tick = function() {
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

JSBP.core.loadFile = function(file) {
    console.time("Loading file " + file.name);
    var reader = new FileReader();

    reader.onload = function(e) {
        var buffer = e.target.result
        // Create a DataView for accessing the file buffer
        var view = new DataView(buffer);

        // Copy the file into the memory
        for (var i = 0; i < buffer.byteLength; i++) {
            JSBP.mem[i] = view.getUint8(i);
        }

        // And pad remaining bytes with zeros
        for (var i = buffer.byteLength; i < JSBP.MEMSIZE; i++) {
            JSBP.mem[i] = 0;
        }

        console.timeEnd("Loading file " + file.name);

        if (JSBP.core.first) {
            JSBP.core.first = false;
            JSBP.start();
        }
    }

    // Read the file asynchronously
    reader.readAsArrayBuffer(file);
}
