

fbManager.downloadImages(user.id);

function setGallery(src) {
    img = document.createElement('img');
    img.className = 'materialboxed responsive-img';
    img.src = src;

    div = document.createElement('div');
    div.className = 'img-gallery';
    div.appendChild(img);
    
    gallery = document.getElementById('gallery');
    gallery.insertBefore(div, gallery.childNodes[0]);

    $('.materialboxed').materialbox();

}

function noPhotos() {
    document.getElementById('noPhotos').style.display = "block";
}