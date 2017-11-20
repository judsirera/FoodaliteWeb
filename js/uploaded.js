var imgURL = user.getLastURL();

if (!!imgURL) {
    displayImage(imgURL);
    getImageDataFromURL(imgURL);
}

function getImageDataFromURL(url) {
    var img = new Image();
    img.src = imgURL;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        data = ctx.getImageData(0, 0, img.width, img.height);
        var palette = getColors(data);
        renderPalette(palette);
    };

}

function getColors(imageData) {
    var colorThief = new ColorThief();
    return colorThief.getPalette(imageData, 8);
}

function displayImage(imgURL) {
    var img = document.getElementById('uploaded-img');
    img.src = imgURL;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function renderPalette(palette) {
    var img = document.getElementById('generated-img');
    var rectWidth = img.width / palette.length;
    var rectHeight = img.height;

    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    
    for (let i = 0; i < palette.length; i++) {
        var color = rgbToHex(palette[i][0], palette[i][1], palette[i][2]);
        console.log(color)
        ctx.fillStyle = color;
        ctx.fillRect(i * rectWidth, 0, rectWidth, rectHeight);
    }
    img.src = canvas.toDataURL("image/png");
}