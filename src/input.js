JSBP.input = {}

JSBP.input.keyMap = [86, 70, 82, 52, 67, 89, 68, 83, 65, 69, 87, 81, 51, 50, 49, 88];
JSBP.input.keyStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

JSBP.input.init = function() {
    $("body").bind("keydown", JSBP.input.keyDown);
    $("body").bind("keyup", JSBP.input.keyUp);
}

JSBP.input.refresh = function() {
    var a = 0, b = 0;

    // Put together the key states like a bit vector
    for (var i = 0; i < 16; i++) {
        if (i >= 8)
            a = a << 1 | JSBP.input.keyStates[i];
        else
            b = b << 1 | JSBP.input.keyStates[i];
    }

    // And set the first two bytes
    JSBP.mem[1] = a;
    JSBP.mem[0] = b;
}

JSBP.input.keyDown = function(e) {
    // Search through the key map
    for (var i = 0; i < JSBP.input.keyMap.length; i++) {
        if (e.keyCode == JSBP.input.keyMap[i]) {
            JSBP.input.keyStates[i] = 1;
            JSBP.input.refresh();
            break;
        }
    }
}

JSBP.input.keyUp = function(e) {
    // Search through the key map
    for (var i = 0; i < JSBP.input.keyMap.length; i++) {
        if (e.keyCode == JSBP.input.keyMap[i]) {
            JSBP.input.keyStates[i] = 0;
            JSBP.input.refresh();
            break;
        }
    }
}
