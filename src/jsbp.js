JSBP = {};

JSBP.running = false;
JSBP.updateId = 0;

// This will be our main memory once JSBP.core loads
JSBP.mem = null;

JSBP.load = function() {
    JSBP.core.load();
    JSBP.canvas.load();
    JSBP.audio.load();

    JSBP.setRunning(true);
}

JSBP.update = function() {
    JSBP.core.update();
    JSBP.canvas.update();
    JSBP.audio.update();
}

JSBP.setRunning = function(state) {
    JSBP.running = state;

    if (state)
        JSBP.updateId = setInterval(JSBP.running.update, 1000 / 60);
    else
        clearInterval(JSBP.updateId);
}

$(JSBP.load);
