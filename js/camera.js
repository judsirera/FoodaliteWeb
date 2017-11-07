var camera = {
  handleFileSelect: function (event) {
    var img = event.target.files[0];

    if (img.type.match('image.*')) {
      console.log(img.name);
      fbManager.setStorageRef(img.name);

      // Closure to capture the file information.
      reader.onload = (function (file) {
        return function (e) {
          document.getElementById('img-display').src = e.target.result;
          document.getElementById('img-display').title = file.name;

          document.getElementById('repeatImg').style.display = "block";
          document.getElementById('loadImg').style.display = "none";
        };
      })(img);

      // Read in the image file as a data URL.
      reader.readAsDataURL(img);
    }
  },

  init: function () {
    document.getElementById('files').addEventListener('change', this.handleFileSelect, false);
    document.getElementById('repeat').addEventListener('change', this.handleFileSelect, false);
    document.getElementById('upload').addEventListener('click', upload, false);
  }
}

camera.init();
