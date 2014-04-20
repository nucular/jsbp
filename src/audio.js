JSBP.audio = {};

JSBP.audio.init = function() {
    JSBP.audio.context = new webkitAudioContext();

    // Create the buffer
    JSBP.audio.buffer = JSBP.audio.context.createBuffer(1, 256 * 2, 15360 * 2);
    JSBP.audio.bufferF32 = new Float32Array(256);

    // This is were we'll write the processed audio block to
    JSBP.audio.data = JSBP.audio.buffer.getChannelData(0);

    // Connect the buffer to the context
    JSBP.audio.node = JSBP.audio.context.createBufferSource(0);
    JSBP.audio.node.loop = true;
    JSBP.audio.node.buffer = JSBP.audio.buffer;
    JSBP.audio.node.noteOn(JSBP.audio.context.currentTime);
}

JSBP.audio.tick = function() {
    // Fetch the audio block location
    var start = JSBP.mem[6]<<16 | JSBP.mem[7]<<8;
    var j;

    // From signed 8-bit to signed float
    for (var i = 0; i < 0xFF; i++) {
        //JSBP.audio.data[i] = (j > 0) ? j / 127 : j / -127;
        JSBP.audio.bufferF32[i] = (JSBP.mem[start | i] / 255.0) - 1;
    }

    // Interpolate from 15360 to 30720
    var mu = 0.2, mu2 = (1 - Math.cos(mu * Math.PI)) / 2;
    var point1, point2;

    for (var i = 0; i < 128; i++) {
        j = i * 2;

        // The points to interpolate between
        point1 = JSBP.audio.bufferF32[i];
        point2 = (i >= 255) ? point1 : JSBP.audio.bufferF32[i + 1];

        // interpolate
        point2 = (point1 * (1 - mu2) + point2 * mu2);
        //point2 = (point1 + point2) / 2;

        // write
        JSBP.audio.data[j] = point1;
        JSBP.audio.data[j + 1] = point2;
    }
}
