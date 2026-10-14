const container = document.getElementById("grid")

let mouseX = 0;
let mouseY = 0;
let mouseVx = 0;
let mouseVy = 0;
let direction = 0;
let rotation = 0;
let gridPosX = 0;
let gridPosY = 0;
let tileSize = 8;
let gridWidth = 7;
let gridHeight = 10;
let sidebarVlength = ((vwToVh(100) - (gridWidth * tileSize))/2);

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
  	return (vhValue * height) / width;
}

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX + window.scrollX;
    mouseY = event.clientY + window.scrollY;
    mouseVx = pxToVh(mouseX);
    mouseVy = pxToVh(mouseY);
});

function handleResize() {
  const width = window.innerWidth;   // Viewport width
  const height = window.innerHeight; // Viewport height
  
  sidebarVlength = ((vwToVh(100) - (gridWidth * tileSize))/2);
}

// Listen for the resize event
window.addEventListener('resize', handleResize);



function updatePosition() {
    const element = document.getElementById("place");
    if (element) {
        //idk what 48 is
        element.style.top = String((Math.round((mouseVy + 10)/ tileSize) * tileSize) - 10) +  "vh";
        element.style.left =  String(Math.round((mouseVx - (vwToVh(100) - 48)/2)/ tileSize) * tileSize + (vwToVh(100) - 48)/2) +  "vh";
        gridPosY = String((Math.round((mouseVy + 10)/ tileSize) * tileSize) - 10);
        gridPosX =  String(Math.round((Math.round((mouseVx - sidebarVlength - tileSize/2)/tileSize) * tileSize + tileSize/2)/tileSize));
        gridPosY = (gridPosY - 6)/tileSize;
        
        console.log("Y: " + gridPosY);
        console.log("X: " + gridPosX);

        //Vertical Clamp
        if(gridPosY < 1)
        {
          	element.style.top = String(10 + tileSize/2) +  "vh";
        }
        if(gridPosY > 10)
        {
          	element.style.top = String(82 + tileSize/2) +  "vh";
        }
        //Horizontal Clamp
        if(gridPosX < 1)
        {
          	element.style.left = String((vwToVh(100) - gridWidth * tileSize)/2 + tileSize/2) +  "vh";
        }
        if(gridPosX > 7)
        {
			element.style.left = String((vwToVh(100) + gridWidth * tileSize)/2 - tileSize/2) +  "vh";
        }

      }
    // Keeps the loop running smoothly
    requestAnimationFrame(updatePosition);
}

// Start the loop
requestAnimationFrame(updatePosition);