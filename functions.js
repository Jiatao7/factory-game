function switchToEditing()
{
    
    playerMode = "editing";
    heldItemElement.style.visibility = "visible";
    document.querySelectorAll(".tile").forEach((element) => {
        element.style.pointerEvents = "auto";
        if (element.innerHTML === "") {
            element.style.cursor = "pointer";
        } else {
            element.style.cursor = "default";
        }
    });
    document.querySelectorAll(".factory").forEach((element) => {
        element.style.cursor = "default";
    });
} 


function switchToPlayer()
{
    playerMode = "player";
    heldItemElement.style.visibility = "hidden";
    document.querySelectorAll(".tile").forEach((element) => {
        element.style.cursor = "default";
        element.style.pointerEvents = "none";
    });

    document.querySelectorAll(".factory").forEach((element) => {
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

function initialiseTiles() {
    document.querySelectorAll(".tile").forEach((element) => {
        element.addEventListener("click", (event) => {
            if (playerMode === "editing") {
                const container = event.currentTarget;
                if (container.innerHTML === "") {
                    const newFactory = document.createElement("div");
                    newFactory.classList.add(
                        "factory",
                        `factory-size-${heldItem.size}`,
                        `factory-type-${heldItem.type}`,
                        `${gridPosX}-${gridPosY}`,
                    );
                    newFactory.style.pointerEvents = "auto";
                    newFactory.addEventListener("click", () => {
                        if (playerMode === "player") {
                            const factorySize = Array.from(element.classList)
                                .find((className) =>
                                    className.startsWith("factory-size-"),
                                )
                                .replace("factory-size-", "");
                            const factoryType = Array.from(element.classList)
                                .find((className) =>
                                    className.startsWith("factory-type-"),
                                )
                                .replace("factory-type-", "");
                            heldItem = Factory(factorySize, factoryType);
                            updateHeldItemElement();
                            newFactory.remove();
                        }
                    });

                    container.append(newFactory);
                    element.style.cursor = "default";
                }
            }
        });
    });
}