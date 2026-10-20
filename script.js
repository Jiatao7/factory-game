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
let playerMode = "editing";
let dragging = false;

window.addEventListener('keydown', (event) => {
    if(event.key == "p")
    {
        if(playerMode == "editing")
        {
            switchToPlayer();
        }
        else
        {
            switchToEditing();
        }
        console.log("now: " + playerMode);
    }
    if(event.key == "Escape")
    {
        const dragged = document.querySelector(".drag");
        if(playerMode == "editing" && dragged)
        {
            switchToPlayer();
            
            dragged.remove();
        }
        console.log("now: " + playerMode);
    }
});

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX + window.scrollX;
    mouseY = event.clientY + window.scrollY;
    mouseVx = pxToVh(mouseX);
    mouseVy = pxToVh(mouseY);
});

// Listen for the resize event
window.addEventListener('resize', handleResize);

function updatePosition() {
    if(playerMode == "editing")
    {
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
    }
    //Make the dragged tile follow the mouse
    const dragged = document.querySelector(".drag");
    if(dragged)
    {
        dragged.style.top = mouseVy + "vh";
        dragged.style.left = mouseVx + "vh";
        switchToEditing();
    }



    requestAnimationFrame(updatePosition);
}
initialiseTiles();
// Start the loop
requestAnimationFrame(updatePosition);

