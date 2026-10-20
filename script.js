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
let sidebarVlength = (vwToVh(100) - gridWidth * tileSize) / 2;
let playerMode = "editing";
const heldItem = new Factory("small");
const heldItemElement = document.querySelector("#place");

function clamp(min, val, max) {
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

function updateHeldItemElement() {
    const factorySize = Array.from(heldItemElement.classList).find(
        (className) => className.startsWith("factory-size-"),
    );
    const factoryType = Array.from(heldItemElement.classList).find(
        (className) => className.startsWith("factory-type-"),
    );
    if (factorySize) {
        heldItemElement.classList.remove(factorySize);
        console.log(`Removing: ${factorySize}`);
    }
    if (factoryType) {
        heldItemElement.classList.remove(factoryType);
        console.log(`Removing: ${factoryType}`);
    }
    heldItemElement.classList.add(
        "factory",
        `factory-size-${heldItem.size}`,
        `factory-type-${heldItem.type}`,
    );
    console.log(`Adding: ${heldItem.size} ${heldItem.type}`);
}

window.addEventListener("keydown", (event) => {
    if (event.key === "p") {
        if (playerMode == "editing") {
            playerMode = "player";
            heldItemElement.style.visibility = "hidden";
            document.querySelectorAll(".tile").forEach((element) => {
                element.style.cursor = "default";
                element.style.pointerEvents = "none";
            });

            document.querySelectorAll(".factory").forEach((element) => {
                element.style.cursor = "pointer";
            });
        } else {
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
        console.log("now: " + playerMode);
    } else if (event.key === "j") {
        heldItem.size = "small";
        updateHeldItemElement();
    } else if (event.key === "k") {
        heldItem.size = "medium";
        updateHeldItemElement();
    } else if (event.key === "l") {
        heldItem.size = "large";
        updateHeldItemElement();
    }
});

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX + window.scrollX;
    mouseY = event.clientY + window.scrollY;
    mouseVx = pxToVh(mouseX);
    mouseVy = pxToVh(mouseY);
});

function handleResize() {
    const width = window.innerWidth; // Viewport width
    const height = window.innerHeight; // Viewport height

    sidebarVlength = (vwToVh(100) - gridWidth * tileSize) / 2;
}

// Listen for the resize event
window.addEventListener("resize", handleResize);

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

function updatePosition() {
    if (playerMode == "editing") {
        const element = heldItemElement;
        if (element) {
            //idk what 48 is
            element.style.top =
                String(Math.round((mouseVy + 10) / tileSize) * tileSize - 10) +
                "vh";
            element.style.left =
                String(
                    Math.round((mouseVx - (vwToVh(100) - 48) / 2) / tileSize) *
                        tileSize +
                        (vwToVh(100) - 48) / 2,
                ) + "vh";
            gridPosY = String(
                Math.round((mouseVy + 10) / tileSize) * tileSize - 10,
            );
            gridPosX = String(
                Math.round(
                    (Math.round(
                        (mouseVx - sidebarVlength - tileSize / 2) / tileSize,
                    ) *
                        tileSize +
                        tileSize / 2) /
                        tileSize,
                ),
            );
            gridPosY = (gridPosY - 6) / tileSize;

            //Vertical Clamp
            if (gridPosY < 1) {
                element.style.top = String(10 + tileSize / 2) + "vh";
            }
            if (gridPosY > 10) {
                element.style.top = String(82 + tileSize / 2) + "vh";
            }
            //Horizontal Clamp
            if (gridPosX < 1) {
                element.style.left =
                    String(
                        (vwToVh(100) - gridWidth * tileSize) / 2 + tileSize / 2,
                    ) + "vh";
            }
            if (gridPosX > 7) {
                element.style.left =
                    String(
                        (vwToVh(100) + gridWidth * tileSize) / 2 - tileSize / 2,
                    ) + "vh";
            }
        }
        gridPosX = clamp(1, gridPosX, 7);
        gridPosY = clamp(1, gridPosY, 10);
    }
    //Make the dragged tile follow the mouse
    const dragged = document.querySelector(".drag");
    if (dragged) {
        console.log("DRAG");
        dragged.style.top = mouseVy + "vh";
        dragged.style.left = mouseVx + "vh";
    }

    requestAnimationFrame(updatePosition);
}

initialiseTiles();
updateHeldItemElement();
// Start the loop
requestAnimationFrame(updatePosition);
