JSBP.screen = {};

JSBP.screen.palette = new Uint32Array(256);

JSBP.screen.init = function() {
    JSBP.screen.context = $("#canvas")[0].getContext("2d");

    // Initiate fast per-pixel stuff using typed arrays
    console.time("Initiating fast per-pixel drawing")
    JSBP.screen.image = JSBP.screen.context.getImageData(0, 0, 256, 256);
    JSBP.screen.buffer = new ArrayBuffer(JSBP.screen.image.data.length);
    JSBP.screen.buffer8 = new Uint8ClampedArray(JSBP.screen.buffer);
    JSBP.screen.array = new Uint32Array(JSBP.screen.buffer);
    console.timeEnd("Initiating fast per-pixel drawing")

    // Build the 6*6*6 color palette
    var i = 0;
    for (var r = 0; r <= 0xFF; r += 0x33)
        for (var g = 0; g <= 0xFF; g += 0x33)
            for (var b = 0; b <= 0xFF; b += 0x33)
                JSBP.screen.palette[i++] = 0xFF000000 | b<<16 | g<<8 | r;

    while (i <= 255)
        JSBP.screen.palette[i++] = 0xFF000000;
}

JSBP.screen.clear = function() {
    JSBP.screen.context.clearRect(0, 0, 256, 256);
}

JSBP.screen.tick = function() {
    // Fetch the graphics block location
    var start = JSBP.mem[5] << 16;
    var i = 0x10000;

    // Run the colors through the palette and copy them to our array
    while (i--)
        JSBP.screen.array[i] = JSBP.screen.palette[JSBP.mem[start | i]];

    // And put the modified data on the screen
    JSBP.screen.image.data.set(JSBP.screen.buffer8);
    JSBP.screen.context.putImageData(JSBP.screen.image, 0, 0);
}
