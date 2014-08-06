JSBP.gui = {};

JSBP.gui.init = function() {
    $("#overlay").bind("dragenter", function(e) {
        e.stopPropagation();
        e.preventDefault();
        // Show that we won't move anything
        e.originalEvent.dataTransfer.dropEffect = "copy";
    });

    $("#overlay").bind("drop", function(e) {
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

    var interval, isover;
    $(document).bind("dragover", function(e) {
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
    });

    $(document).bind("drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $("#screen").bind("mouseenter", function(e) {
        if (!JSBP.core.first) {
            if (JSBP.running)
                $("#pause").attr("class", "mega-octicon octicon-playback-pause");
            else
                $("#pause").attr("class", "mega-octicon octicon-playback-play");
            $("#pause").fadeIn("fast");
        }
    });

    $("#screen").bind("mouseleave", function(e) {
        if (!JSBP.core.first) {
            $("#pause").fadeOut("fast");
        }
    });

    $("#screen").bind("click", function(e) {
        if (!JSBP.core.first) {
            JSBP.toggle();
            if (JSBP.running)
                $("#pause").attr("class", "mega-octicon octicon-playback-pause");
            else
                $("#pause").attr("class", "mega-octicon octicon-playback-play");
        }
    });
}

