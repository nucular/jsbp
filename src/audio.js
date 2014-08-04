JSBP.audio = {};

JSBP.audio.init = function() {
    JSBP.audio.context = new webkitAudioContext();

    // Create the buffer
    JSBP.audio.buffer = JSBP.audio.context.createBuffer(1, 256 * 2, 15360 * 2);

    // This is were we'll write the processed audio block to
    JSBP.audio.data = JSBP.audio.buffer.getChannelData(0);

    // Connect the buffer to the context
    JSBP.audio.node = JSBP.audio.context.createBufferSource(0);
    JSBP.audio.node.loop = true;
    JSBP.audio.node.buffer = JSBP.audio.buffer;
    JSBP.audio.node.start();
}

JSBP.audio.tick = function() {
    var s8ToFloat = function(s) {
        return (s >= 128 ? s - 256 : s) / 127;
    }

    // Fetch the audio block location
    var start = JSBP.mem[6] << 16 | JSBP.mem[7] << 8;

    // Interpolate from 15360 to 30720
    var s1, s2;

    for (var i = 0; i <= 256; i++) {
        // Get samples
        s1 = s8ToFloat(JSBP.mem[start | i]);
        s2 = (i >= 255) ? s1 : s8ToFloat(JSBP.mem[start | (i + 1)]);

        // Interpolate and write
        JSBP.audio.data[i * 2] = s1;
        JSBP.audio.data[i * 2 + 1] = (s1 + s2) / 2;
    }
}
