function changePageTitle(newtitle) {
  document.title = newtitle + " - Souple";
}

const interactiveButtons = document.querySelectorAll('.interactiveButtons img');

// Function to swap image on hover
function swapImageOnHover(imageElement, hoverImagePath) {
  imageElement.addEventListener('mouseover', () => {
    imageElement.src = hoverImagePath;
  });
  imageElement.addEventListener('mouseout', () => {
    imageElement.src = imageElement.dataset.originalSrc; // Restore original image on mouseout
  });
}

// Loop through nav buttons and attach hover event listeners
  interactiveButtons.forEach(button => {
  const originalSrc = button.src;
  const hoverImagePath = originalSrc.replace('.png', '-hovered.png'); 

// Construct hover image path
  button.dataset.originalSrc = originalSrc;

// Store original source for restoration
  swapImageOnHover(button, hoverImagePath);
});