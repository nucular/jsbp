JSBP.demos = {};

JSBP.demos.paths = {
    "Audio Test": "demos/audiotest.bp",
    "Inverted Sine": "demos/invertloopsine.bp",
    "Keyboard Test": "demos/keyboard.bp",
    "Logo": "demos/logo.bp",
    "Munching Squares": "demos/munching.bp",
    "Nyan Cat": "demos/nyan.bp",
    "Palette Test": "demos/palette.bp",
    "Sine Scroller": "demos/scroller.bp",
    "Sprite Test": "demos/sprites.bp"
}

JSBP.demos.init = function() {
    $("#right").children("a").each(function(i, v) {
        $(v).on("click", function() {
            var t = $(v).text();
            if (JSBP.demos.paths.hasOwnProperty(t)) {
                JSBP.demos.load(JSBP.demos.paths[t]);
            }
        });
    })
}

JSBP.demos.load = function(url) {
    console.time("Downloading file from " + url);

    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function(e) {
        console.timeEnd("Downloading file from " + url);
        var ab = req.response;

        if (req.status == 200) {
            JSBP.core.loadArrayBuffer(ab);
        } else {
            JSBP.gui.showOverlay("Could not download the demo", "alert",
                "rgba(90, 40, 40, 0.8)", 1000);
        }
    }

    req.send(null);
}
