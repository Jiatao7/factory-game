function switchToEditing()
{
    playerMode = "editing";
    document.getElementById("place").style.visibility = "visible";
    document.querySelectorAll(".tile").forEach(element => {
        element.style.pointerEvents = "auto";
        if(element.innerHTML === ""){
            element.style.cursor = "pointer";
        }
        else
        {
            element.style.cursor = "default";
        }
    });
    document.querySelectorAll(".factory").forEach(element => {
        element.style.cursor = "default";
    });
}

function switchToPlayer()
{
    playerMode = "player";
    document.getElementById("place").style.visibility = "hidden";
    document.querySelectorAll(".tile").forEach(element => {
        element.style.cursor = "default";
        element.style.pointerEvents = "none";
    });

    document.querySelectorAll(".factory").forEach(element => {
        element.style.cursor = "pointer";
    });
}

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

function handleResize() {
    const width = window.innerWidth;   // Viewport width
    const height = window.innerHeight; // Viewport height

    sidebarVlength = ((vwToVh(100) - (gridWidth * tileSize))/2);
}

function initialiseTiles(){
    document.querySelectorAll(".tile").forEach(element => {
        element.addEventListener('click', (event) => {
            if(playerMode == "editing")
            {
                const container = event.currentTarget;
                if(container.innerHTML === "")
                {
                    const newFactory = document.createElement('div');
                    newFactory.className = String("factory " + String(gridPosX) + "-" + String(gridPosY) + " tier1");
                    container.append(newFactory);
                    if(dragging)
                    {
                        switchToPlayer();
                        dragging = false;
                        document.querySelector(".drag").remove();
                        console.log("Removed Dragging Element");
                    }
                    newFactory.style.pointerEvents = "auto";


                    newFactory.addEventListener('click', (innerEvent) => {
                        //delete and create new one to take it out
                        console.log("Created Dragging Element");
                        dragging = true;
                        innerEvent.currentTarget.remove();
                        const container = document.getElementById("screen");
                        const replacement = document.createElement("div");
                        replacement.style.pointerEvents =  "none";
                        replacement.classList.add("factory", "1-1", "tier1", "drag");
                        container.append(replacement);
                        //switchToEditing();
                    });
                    element.style.cursor = "default";
                }
            }
        });
    });
}