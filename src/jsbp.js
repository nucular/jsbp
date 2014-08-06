JSBP = {};

// Constants
JSBP.MEMSIZE = 0x1000008;

JSBP.running = false;
JSBP.tickId = 0;
JSBP.speed = 1000 / 60;

// This will be our main memory
JSBP.mem = null;

JSBP.init = function() {
    console.time("Allocating 16MiB");
    JSBP.mem = new Uint8Array(JSBP.MEMSIZE);
    console.timeEnd("Allocating 16MiB");

    JSBP.screen.init();
    JSBP.audio.init();
    JSBP.input.init();
    JSBP.gui.init();
}

JSBP.tick = function() {
    JSBP.core.tick();
    JSBP.screen.tick();
    JSBP.audio.tick();
}


JSBP.start = function() {
    if (!JSBP.running) {
        JSBP.tickId = setInterval(JSBP.tick, JSBP.speed);
        JSBP.audio.node.connect(JSBP.audio.context.destination);
        JSBP.running = true;
    }
}

JSBP.stop = function() {
    if (JSBP.running) {
        clearInterval(JSBP.tickId);
        JSBP.audio.node.disconnect();
        JSBP.running = false;
    }
}

JSBP.toggle = function() {
    if (JSBP.running)
        JSBP.stop();
    else
        JSBP.start();
}

JSBP.setSpeed = function(speed) {
    JSBP.speed = speed;
    if (JSBP.running) {
        clearInterval(JSBP.tickId);
        JSBP.tickId = setInterval(JSBP.tick, speed);
    }
}

$(JSBP.init);
