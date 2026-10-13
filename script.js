const container = document.getElementById("grid")

let mouseX = 0;
let mouseY = 0;
let mouseVx = 0;
let mouseVy = 0;
let direction = 0;
let rotation = 0;
let gridPosX = 0;
let gridPosY = 0;

function pxToVh(pxValue) {
  const viewportHeight = window.innerHeight;
  return (pxValue / viewportHeight) * 100;
}

function vwToVh(vwValue) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  return vwValue * (width / height);
}

function vhToVw(vhValue) {
  const height = window.innerHeight;
  const width = window.innerWidth;
  return (vhValue * h) / w;
}

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX + window.scrollX;
    mouseY = event.clientY + window.scrollY;
    mouseVx = pxToVh(mouseX);
    mouseVy = pxToVh(mouseY);
});



function updatePosition() {
    const element = document.getElementById("place");
    if (element) {
        element.style.top = String((Math.round((mouseVy + 10)/ 8) * 8) - 10) +  "vh";
        element.style.left =  String(Math.round((mouseVx - (vwToVh(100) - 48)/2)/ 8) * 8 + (vwToVh(100) - 48)/2) +  "vh";
        gridPosY = String((Math.round((mouseVy + 10)/ 8) * 8) - 10);
        gridPosX =  String(Math.round((mouseVx - (vwToVh(100) - 48)/2)/ 8) * 8 + (vwToVh(100) - 48)/2);
        gridPosY = (gridPosY - 6)/8;
        
        console.log("Y: " + gridPosY);
        console.log((Math.round(gridPosX - 32)/8));
        if(gridPosY < 1)
        {
          console.log("over")
          element.style.top = String((gridPosY) * 8) +  "vh";
        }
      }
    // Keeps the loop running smoothly
    requestAnimationFrame(updatePosition);
}

// Start the loop
requestAnimationFrame(updatePosition);