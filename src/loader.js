JSBP.loader = {};

JSBP.loader.init = function() {
    $("#screen").bind("dragover", JSBP.loader.dragOver);
    $("#screen").bind("drop", JSBP.loader.drop);
}

JSBP.loader.loadFile = function(file) {
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
    }

    // Read the file asynchronously
    reader.readAsArrayBuffer(file);
}

JSBP.loader.dragOver = function(e) {
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
