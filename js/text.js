var items = 1

var text = {
    template: "",
    parent: "",

    addLine: function (event) {
        line = event.target.parentElement;
        line.className = line.className + " disabled";

        items = items + 1;
        newLine = template.cloneNode(true);
        newLine.id = "item_" + items;
        (newLine.childNodes[3].childNodes[1]).id = "add-line_" + items;
        (newLine.childNodes[5].childNodes[1]).id = "delete-line_" + items;

        parent.insertBefore(newLine, parent.childNodes[items]);

        document.getElementById('add-line_' + items).addEventListener('click', text.addLine, false);
        document.getElementById('delete-line_' + items).addEventListener('click', text.deleteLine, false);
    },

    deleteLine: function (event) {
        items = items - 1;

        line = event.target.parentElement.parentElement.parentElement;
        parent.removeChild(line);

        lastChild = parent.childNodes[items];
        (lastChild.childNodes[3].childNodes[1]).className = "btn-floating waves-effect waves-light green lighten-2 btn-margin";

        if (items == 1) {
            (lastChild.childNodes[5].childNodes[1]).className = "btn-floating waves-effect waves-light green lighten-2 btn-margin disabled";
        }
    },

    uploadInfo: function () {
        console.log("upload");
    },

    init: function () {

        document.getElementById('add-line_1').addEventListener('click', this.addLine, false);
        document.getElementById('delete-line_1').addEventListener('click', this.deleteLine, false);
        document.getElementById('upload-text').addEventListener('click', this.uploadInfo, false);

        template = document.getElementById('item_1').cloneNode(true);
        parent = document.getElementById('item_1').parentElement;

        
        document.getElementById('delete-line_1').className = "btn-floating waves-effect waves-light green lighten-2 btn-margin disabled";

    }
}

text.init();