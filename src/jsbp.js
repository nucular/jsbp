JSBP = {};

// Constants
JSBP.MEMSIZE = 0x1000008;

JSBP.running = false;
JSBP.tickId = 0;

// This will be our main memory once JSBP.core loads
JSBP.mem = null;

JSBP.init = function() {
    JSBP.core.init();
    JSBP.canvas.init();
    JSBP.audio.init();
    JSBP.input.init();
    JSBP.loader.init();

    //JSBP.setRunning(true);
}

JSBP.tick = function() {
    JSBP.core.tick();
    JSBP.canvas.tick();
    JSBP.audio.tick();
}

JSBP.setRunning = function(state) {
    JSBP.running = state;

    if (state) {
        JSBP.tickId = setInterval(JSBP.tick, 1000 / 60);
        JSBP.audio.node.connect(JSBP.audio.context.destination);
    }
    else {
        clearInterval(JSBP.tickId);
        JSBP.audio.node.disconnect();
    }
}

$(JSBP.init);
