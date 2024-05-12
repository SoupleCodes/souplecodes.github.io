function changePageTitle(newtitle) {
  document.title = newtitle + " - Souple";
}

const navButtons = document.querySelectorAll('.nav-buttons img');

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
navButtons.forEach(button => {
  const originalSrc = button.src;
  const hoverImagePath = originalSrc.replace('.png', '-hovered.png'); 
  
// Construct hover image path
  button.dataset.originalSrc = originalSrc;
  
// Store original source for restoration
  swapImageOnHover(button, hoverImagePath);
});

function newCanvas(canvasName, x, y, roundPercent, bgcolor, border, boxShadow) {
  const canvas = document.getElementById(canvasName);
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  canvas.style.position = "absolute";
  canvas.style.bottom = y - (canvasHeight - 125) + "px";
  canvas.style.left = x - (canvasWidth / 2) + "px";
  canvas.style.borderRadius = roundPercent;
  canvas.style.backgroundColor = bgcolor;
  canvas.style.border = border;
  canvas.style.boxShadow = boxShadow;
}

newCanvas("share", 170, 490, "10px", "rgba(1, 1,1,0.2)", "2.25px solid rgba(0,0,0,0.5)","0px 0px 10px rgba(0, 0, 0, 0.6)");

newCanvas("blog", 590, 490, "10px", "rgba(1, 1,1,0.2)", "2.25px solid rgba(0,0,0,0.5)","0px 0px 10px rgba(0, 0, 0, 0.6)");

newCanvas("soup-of-the-week", 170, 330, "10px", "rgba(1, 1,1,0.2)", "2.25px solid rgba(0,0,0,0.5)","0px 0px 10px rgba(0, 0, 0, 0.6)");

newCanvas("trivia", 170, 45, "10px", "rgba(1, 1,1,0.2)", "2.25px solid rgba(0,0,0,0.5)","0px 0px 10px rgba(0, 0, 0, 0.6)");

ctx.beginPath();
ctx.rect(20, 40, 150, 100);
ctx.stroke();

// function newImage(imageName, x, y, width, height, roundPercent)

