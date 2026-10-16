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

function clamp(min, val, max)
{
	return Math.min(Math.max(val, min), max);
}

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
    Array.from(document.getElementsByClassName("factory")).forEach(element => {
        element.style.left = sidebarVlength + "vh";
        console.log("bruh")
    });
}

// Listen for the resize event
window.addEventListener('resize', handleResize);

const element = document.querySelector('#myElement');

/*window.addEventListener('mousedown', (event) => {
  	console.log('Mouse button pressed down!');
	const container = document.getElementById("grid");
	const clone = document.getElementById("place").cloneNode(true);
    clone.removeAttribute("id");
	clone.className = String("factory " + String(gridPosX) + " " + String(gridPosY));	
	console.log(document.getElementById("place").style.left)
	clone.style.left = document.getElementById("place").style.left;
	console.log(document.getElementById("place").style.left)
	

	container.append(clone);
});*/


function initialiseTiles(){
    document.querySelectorAll(".tile").forEach(element => {
        element.addEventListener('click', (event) => {
            //console.log(element.classList);
            //console.log(event.currentTarget);
            const container = event.currentTarget;
            if(container.innerHTML === "")
            {
                const clone = document.getElementById("place").cloneNode(true);
                clone.removeAttribute("id");
                clone.className = String("factory " + String(gridPosX) + " " + String(gridPosY));
                container.append(clone);
            }
	
        });
    });
}

function updatePosition() {
    const element = document.getElementById("place");
    if (element) {
        //idk what 48 is
        element.style.top = String((Math.round((mouseVy + 10)/ tileSize) * tileSize) - 10) +  "vh";
        element.style.left =  String(Math.round((mouseVx - (vwToVh(100) - 48)/2)/ tileSize) * tileSize + (vwToVh(100) - 48)/2) +  "vh";
        gridPosY = String((Math.round((mouseVy + 10)/ tileSize) * tileSize) - 10);
        gridPosX =  String(Math.round((Math.round((mouseVx - sidebarVlength - tileSize/2)/tileSize) * tileSize + tileSize/2)/tileSize));
        gridPosY = (gridPosY - 6)/tileSize;

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
	gridPosX = clamp(1, gridPosX, 7);
	gridPosY = clamp(1, gridPosY, 10);
	//console.log("Y: " + gridPosY);
    //console.log("X: " + gridPosX);
    // Keeps the loop running smoothly
    requestAnimationFrame(updatePosition);
}
initialiseTiles();
// Start the loop
requestAnimationFrame(updatePosition);

