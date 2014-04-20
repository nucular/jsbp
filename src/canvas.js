JSBP.canvas = {};

JSBP.canvas.palette = new Uint32Array(255);

JSBP.canvas.init = function() {
    JSBP.canvas.context = $("#screen")[0].getContext("2d");

    // Initiate fast per-pixel stuff using typed arrays
    JSBP.canvas.image = JSBP.canvas.context.getImageData(0, 0, 256, 256);
    JSBP.canvas.buffer = new ArrayBuffer(JSBP.canvas.image.data.length);
    JSBP.canvas.buffer8 = new Uint8ClampedArray(JSBP.canvas.buffer);
    JSBP.canvas.array = new Uint32Array(JSBP.canvas.buffer);

    // Build the 6*6*6 color palette
    var i = 0;
    for (var r = 0; r <= 0xFF; r += 0x33)
        for (var g = 0; g <= 0xFF; g += 0x33)
            for (var b = 0; b <= 0xFF; b += 0x33)
                JSBP.canvas.palette[i++] = 0xFF000000 | b<<16 | g<<8 | r;
}

JSBP.canvas.tick = function() {
    // Fetch the graphics block location
    var start = JSBP.mem[5] << 16;
    var i = 0x10000;

    // Run the colors through the palette and copy them to our array
    while (i--)
        JSBP.canvas.array[i] = JSBP.canvas.palette[JSBP.mem[start | i]];

    // And put the modified data on the screen
    JSBP.canvas.image.data.set(JSBP.canvas.buffer8);
    JSBP.canvas.context.putImageData(JSBP.canvas.image, 0, 0);
}
