const interactiveButtons = document.querySelectorAll('#nav-btns img, .box-button');

function swapImageOnHover(imageElement, hoverImagePath) {
  imageElement.addEventListener('mouseover', () => {
    imageElement.src = hoverImagePath;
  });
  imageElement.addEventListener('mouseout', () => {
    imageElement.src = imageElement.dataset.originalSrc;
  });
}

  interactiveButtons.forEach(button => {
  const originalSrc = button.src;
  const hoverImagePath = originalSrc.replace('.png', '-hovered.png'); 
  button.dataset.originalSrc = originalSrc;
  swapImageOnHover(button, hoverImagePath);
});