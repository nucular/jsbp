JSBP.loader = {};

JSBP.loader.init = function() {
    $("#overlay").bind("dragenter", JSBP.loader.dragEnter);
    $("#overlay").bind("drop", JSBP.loader.drop);

    $(document).bind("dragover", JSBP.loader.docDragOver);
    $(document).bind("drop", JSBP.loader.docDrop);
}

JSBP.loader.loadFile = function(file) {
    console.time("Loading file " + file.name);
    var reader = new FileReader();

    reader.onload = function(e) {
        var buffer = e.target.result
        // Create a DataView for accessing the file buffer
        var view = new DataView(buffer);
        // Reallocate the memory
        JSBP.mem = new Uint8Array(JSBP.MEMSIZE);

        // And finally copy the file into the new memory
        for (var i = 0; i < buffer.byteLength; i++) {
            JSBP.mem[i] = view.getUint8(i);
        }
        console.timeEnd("Loading file " + file.name);
    }

    // Read the file asynchronously
    reader.readAsArrayBuffer(file);
}

JSBP.loader.dragEnter = function(e) {
    e.stopPropagation();
    e.preventDefault();
    // Show that we won't move anything
    e.originalEvent.dataTransfer.dropEffect = "copy";
}

JSBP.loader.drop = function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.originalEvent.dataTransfer.files.length == 0)
        return

    // Only allow one file at a time
    var file = e.originalEvent.dataTransfer.files[0];

    if (file.size < JSBP.MEMSIZE)
        JSBP.loader.loadFile(file);
    else
        alert("File too big");
}


JSBP.loader.docDragOver = (function() {
    var interval, isover;

    // Hacky workaround
    return function(e) {
        e.preventDefault();

        clearInterval(interval);

        interval = setInterval(function() {
            isover = false;
            clearInterval(interval);

            $("#overlay").fadeOut("fast", function() {
                $("#overlay").css("display", "none");
            });
        }, 100);

        if (!isover) {
            isover = true;
            e.originalEvent.dataTransfer.dropEffect = "none";

            $("#overlay").fadeTo("fast", 0.8);
        }
    }
})();

JSBP.loader.docDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
}
