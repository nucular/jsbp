JSBP = {};

JSBP.load = function() {
    JSBP.core.load();
    JSBP.canvas.load();
    JSBP.audio.load();
}

$(JSBP.load);
