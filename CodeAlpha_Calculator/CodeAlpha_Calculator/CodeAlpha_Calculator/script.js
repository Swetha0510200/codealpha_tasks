function openImage(img) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = img.src;
}

function closeImage() {
    document.getElementById("lightbox").style.display = "none";
}
