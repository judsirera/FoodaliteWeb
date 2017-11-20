var imgURL = user.getLastURL();
console.log("img: " + imgURL);

if (imgURL != null) {
    setImageUploaded(imgURL);

    var colorThief = new ColorThief()

    console.log(colorThief.getColorFromUrl(imgURL))
    // img = document.getElementById("uploaded-img");
    // img.addEventListener('load', function () {
    //     var colorThief = new ColorThief()
    //     var palette = colorThief.getPalette(img, 8);
    //     console.log(palette);
    // })
}

function setImageUploaded(url) {
    var img = document.getElementById("uploaded-img");
    img.src = url;
    $('.materialboxed').materialbox();
}
