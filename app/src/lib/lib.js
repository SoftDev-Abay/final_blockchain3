function isValidImgSrc(src) {
    const img = new Image();
    img.src = src;

    return img.complete;
}

export { isValidImgSrc };
