JSBP.gui = {};

JSBP.gui.init = function() {
    JSBP.gui.bindOverlay();
    JSBP.gui.bindDocument();
    JSBP.gui.bindCanvas();

    JSBP.gui.showOverlay(
        "This is a <a href=\"http://esolangs.org/wiki/BytePusher\">BytePusher</a> VM.<br/>\
        Drop a binary file here or select a demo.", "file-binary");
}

JSBP.gui.showOverlay = function(text, icon, back, delay) {
    var icon = icon || "info";
    var back = back || "rgba(40, 40, 40, 0.8)";

    var $overlay = $("#overlay");

    var show = function() {
        $("#overlay-icon").attr("class", "mega-octicon octicon-" + icon);
        $("#overlay-text").html(text);
        $overlay.css("background-color", back).fadeIn("fast");
        if (delay) {
            $overlay.delay(delay).fadeOut("fast");
        }
    }

    if ($overlay.attr("display") == "none") {
        show();
    } else {
        $overlay.fadeOut("fast", show);
    }
}

JSBP.gui.hideOverlay = function() {
    var $overlay = $("#overlay");
    if ($overlay.attr("display") != "none")
        $overlay.stop().fadeOut("fast");
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

        if (file.size < JSBP.MEMSIZE) {
            JSBP.screen.clear();
            JSBP.core.loadFile(file);
        } else {
            $(this).fadeOut("fast", function() {
                JSBP.gui.showOverlay("That file is too large<br/>(16MiB max.)",
                    "alert", "rgba(90, 40, 40, 0.8)", 1000);
            });
        }
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
            JSBP.gui.hideOverlay();
        }, 100);

        if (!isover) {
            isover = true;
            e.originalEvent.dataTransfer.dropEffect = "none";

            JSBP.gui.showOverlay("Drop the file here<br/>(16 MiB max.)", "file-binary");
        }
    }).on("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
}

JSBP.gui.bindCanvas = function() {
    $("#canvas").on("mouseenter", function(e) {
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
