JSBP.gui = {};

JSBP.gui.init = function() {
    JSBP.gui.bindOverlay();
    JSBP.gui.bindDocument();
    JSBP.gui.bindScreen();
}

JSBP.gui.bindOverlay = function() {
    $("#overlay").on("dragenter", function(e) {
        e.stopPropagation();
        e.preventDefault();
        // Show that we won't move anything
        e.originalEvent.dataTransfer.dropEffect = "copy";
    }).on("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (e.originalEvent.dataTransfer.files.length == 0)
            return

        // Only allow one file at a time
        var file = e.originalEvent.dataTransfer.files[0];

        if (file.size < JSBP.MEMSIZE)
            JSBP.core.loadFile(file);
        else
            alert("File too big");
    });
}

JSBP.gui.bindDocument = function() {
    var interval, isover;
    $(document).on("dragover", function(e) {
        e.preventDefault();

        clearInterval(interval);

        interval = setInterval(function() {
            isover = false;
            clearInterval(interval);

            if (!JSBP.core.first) {
                $("#overlay").fadeOut("fast");
            }
        }, 100);

        if (!isover) {
            isover = true;
            e.originalEvent.dataTransfer.dropEffect = "none";

            $("#overlay").fadeIn("fast");
        }
    }).on("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
}

JSBP.gui.bindScreen = function() {
    $("#screen").on("mouseenter", function(e) {
        if (!JSBP.core.first) {
            if (JSBP.running)
                $("#pause").attr("class", "mega-octicon octicon-playback-pause");
            else
                $("#pause").attr("class", "mega-octicon octicon-playback-play");
            $("#pause").fadeIn("fast");
        }
    }).on("mouseleave", function(e) {
        if (!JSBP.core.first) {
            $("#pause").fadeOut("fast");
        }
    }).on("click", function(e) {
        if (!JSBP.core.first) {
            JSBP.toggle();
            if (JSBP.running)
                $("#pause").attr("class", "mega-octicon octicon-playback-pause");
            else
                $("#pause").attr("class", "mega-octicon octicon-playback-play");
        }
    });
}
