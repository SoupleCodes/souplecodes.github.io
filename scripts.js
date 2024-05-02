function createImage(src, x, y, width, height) {
    var img = document.createElement("img");
    img.src = src;
    img.style.position = "absolute";
    img.style.left = x + "px";
    img.style.top = y + "px";
    img.style.width = width + "px";
    img.style.height = height + "px";
    document.getElementById("imageContainer").appendChild(img);
    return img;