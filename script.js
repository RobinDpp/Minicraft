const gridContainer = document.getElementById('grid-container');
const player = document.getElementById('player')

const screenW = screen.width
const screenH = screen.height
const rows = 11;
const cols = 11;
var inputX = "undefined";
var inputY = "undefined";
var posX = (screenW/2 - 70)
var posY = (screenH/2 - 20)
var terrainColors = []
var terrainObject = []
var lockedTerrainColors = []


function genTerrain(){
    for (let i = 0; i < rows * cols; i++) {
        randomColor = Math.floor(Math.random() * 4);
        if (randomColor == 0){
            randomColor = 'yellow'
        }else{
            randomColor = 'green'
        }
        // else if (randomColor == 2){
        //     randomColor = 'blue'
        // }else if (randomColor == 3){
        //     randomColor = 'red'
        // }else if (randomColor == 4){
        //     randomColor = 'purple'
        // }else if (randomColor == 5){
        //     randomColor = 'violet'
        // }else if (randomColor == 6){
        //     randomColor = 'black'
        // }
        terrainColors.push(randomColor)
    }
}

genTerrain()

for (let i = 0; i < rows * cols; i++) {
    const gridItem = document.createElement('div');
    gridItem.style.backgroundColor = terrainColors[i]
    terrainObject.push(gridItem)
    
    // gridItem.addEventListener('click', () => {

    // });
    
    gridContainer.appendChild(gridItem);
}


document.addEventListener("mousedown", function(e){
    startSwipe(e)
})
document.addEventListener("mouseup", function(e){
    endSwipe(e)
})
document.addEventListener("touchstart", function(e){
    startSwipe(e)
})
document.addEventListener("touchend", function(e){
    endSwipe(e)
})

function startSwipe(input){
    event.preventDefault();
    inputX = input.clientX
    inputY = input.clientY
}

function endSwipe(input){
    if (inputX != "undefined" && inputY != "undefined"){
        if (Math.abs(input.clientX - inputX) > Math.abs(input.clientY - inputY)){
            if (input.clientX - inputX < 0){
                if (posX > screenW/2 - 70 - 150){
                    posX -= 52
                    movePlayer(posX, posY)
                }   else{
                    moveTerrain('right')
                }
            }   else{
                if (posX < screenW/2 - 70 + 150){
                    posX += 52
                    movePlayer(posX, posY)
                }   else{
                    moveTerrain('left')
                }
            }
        }   else{
            if (input.clientY - inputY < 0){
                if (posY > screenH/2 - 20 - 150){
                    posY -= 52
                    movePlayer(posX, posY)
                }   else{
                    moveTerrain('up')
                }
            }   else{
                if (posY < screenH/2 - 20 + 150){
                    posY += 52
                    movePlayer(posX, posY)
                }   else{
                    moveTerrain('down')
                }
            }
        }
    }
}

document.getElementById('fullscreen-button').addEventListener('click', activerPleinEcran);

function activerPleinEcran() {
    const element = document.documentElement; // L'élément racine <html>
    if (element.requestFullscreen) {
        element.requestFullscreen(); // Standard
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Chrome, Safari et Opera
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // Internet Explorer/Edge
    }

    movePlayer(posX, posY)
}

function movePlayer(x, y){
    player.style.left = x + 'px'
    player.style.top = y + 'px'
}

function moveTerrain(dir){
    lockedTerrainColors = []
    for (let i = 0; i<terrainColors.length; i++){
        lockedTerrainColors.push(terrainColors[i])
    }    
    
    if (dir == "right"){
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                if (j == 0){
                    terrainObject[i * rows + j].style.backgroundColor = lockedTerrainColors[i * rows + cols - 1]
                    terrainColors[i * rows + j] = lockedTerrainColors[i * rows + cols - 1]
                }   else{
                    console.log(i * rows + j, i * rows + j - 1)
                    terrainObject[i * rows + j].style.backgroundColor = lockedTerrainColors[i * rows + j - 1]
                    terrainColors[i * rows + j] = lockedTerrainColors[i * rows + j - 1]
                }
            }
        }
    }
    if (dir == "left"){
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                if (j == cols-1){
                    terrainObject[i * rows + j].style.backgroundColor = lockedTerrainColors[i * rows]
                    terrainColors[i * rows + j] = lockedTerrainColors[i * rows]
                }   else{
                    terrainObject[i * rows + j].style.backgroundColor = lockedTerrainColors[i * rows + j + 1]
                    terrainColors[i * rows + j] = lockedTerrainColors[i * rows + j + 1]
                }
            }
        }
    }
    if (dir == "up"){
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                if (i == 0){
                    terrainObject[j].style.backgroundColor = lockedTerrainColors[rows * cols - cols + j]
                    terrainColors[j] = lockedTerrainColors[rows * cols - cols + j]
                }   else{
                    terrainObject[i * rows + j].style.backgroundColor = lockedTerrainColors[i * rows + j - rows]
                    terrainColors[i * rows + j] = lockedTerrainColors[i * rows + j - rows]
                }
            }
        }

    }
    if (dir == "down"){
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < cols; j++){
                if (i == rows-1){
                    terrainObject[i * rows + j].style.backgroundColor = lockedTerrainColors[j]
                    terrainColors[i * rows + j] = lockedTerrainColors[j]
                }   else{
                    terrainObject[i * rows + j].style.backgroundColor = lockedTerrainColors[i * rows + j + rows]
                    terrainColors[i * rows + j] = lockedTerrainColors[i * rows + j + rows]
                }
            }
        }
    }
}