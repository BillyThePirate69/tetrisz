// Pair Programming Tetris(2d-Array based) //
// Justyn Pollard //
// April 18, 2018 //

// global variables //

// 0 = Empty location, 3 = stopped moving block, 2 = Stationary block, 1 = Moving block
let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let shapeGrid;

let shapes = ['S', 'Z', 'I', 'L', 'T', 'J', 'square']
let cellSize = 50;
let winHeight = 1200;
let winWidth = 1600;
let startScreenOn = true;
let gameScreenOn = false;
let playButton, playButtonHighlighted;
let block;
let pickedShape;
let spaceFree = true;
let threePresent;


// Setup Functions //
function preload() {
  playButton = loadImage("images/playButton.png")
  playButtonHighlighted = loadImage("images/playButtonHighlighted.png")
  tetrisFont = loadFont("assets/ModernTetris.ttf")
}

function setup() {
  createCanvas(1600, 1200);
}

Array.prototype.sample = function() {
  return this[Math.floor(Math.random() * this.length)];
}

// Functions //

function displayStartScreen() {
  for (let i = 0; i < winHeight; i++) { //Displays gradient background
    stroke(i / winHeight * 255, 71, 190);
    line(0, i, 1600, i);
  }
  playButtonFun();
}

function playButtonFun() {
  if (mouseX >= 1600 / 2 - 130 && mouseX <= 1600 / 2 + 130 && mouseY >= 500 && mouseY <= 600) { // Button Function
    image(playButtonHighlighted, 1600 / 2 - 130, 500);
    if (mouseIsPressed) {
      startScreenOn = false;
      gameScreenOn = true;
    }
  } else {
    image(playButton, 1600 / 2 - 130, 500);
  }
}



function displayGameScreen() {
  background(0);
  stroke(255);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 18; y++) {
      if (grid[y][x] === 0) {
        fill(100);
      }
      if (grid[y][x] === 1) {
        fill(0, 100, 100);
      }
      if (grid[y][x] === 2) {
        fill("green");
      }
      if (grid[y][x] === 3) {
        fill("red");
      }
      rect(550 + x * cellSize, 200 + y * cellSize, cellSize, cellSize);
    }
  }

  pickShape();
  moveBlocks();
}


function pickShape() {
  if (spaceFree === true) {
    spaceFree = false;
    currentShape = shapes.sample();
    spawnShape()
    for (let x = 0; x < shapeGrid.length; x++) {
      for (let y = 0; y < shapeGrid.length; y++) {
        grid[0 + x][5 + y] = shapeGrid[x][y]
      }
    }
  }
}

function spawnShape() {
  if (currentShape === 'I') {
    shapeGrid = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
  } else if (currentShape === 'L') {
    shapeGrid = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ];
  } else if (currentShape === 'Z') {
    shapeGrid = [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ];
  } else if (currentShape === 'square') {
    shapeGrid = [
      [1, 1],
      [1, 1],
    ];
  } else if (currentShape === 'S') {
    shapeGrid = [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ];
  } else if (currentShape === 'J') {
    shapeGrid = [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ];
  } else if (currentShape === 'T') {
    shapeGrid = [
      [1, 0, 0],
      [1, 1, 0],
      [1, 0, 0],
    ];
  }
}

function moveBlocks() {
  if (frameCount % 30 === 0) {
    for (let x = 9; x >= 0; x--) {
      for (let y = 17; y >= 0; y--) {
        if (grid[y][x] === 1) {
          if (grid[y + 1][x] === 2 || grid[y + 1][x] === 3) {
            grid[y][x] = 3;
          } else if (y + 1 === 17) {
            grid[y + 1][x] = 3;
            grid[y][x] = 0;
          } else {
            grid[y + 1][x] = 1;
            grid[y][x] = 0;
          }
        }
      }
    }
  }
  checkSpace()
}

function checkSpace() {
  threePresent = false;
  for (let x = 9; x >= 0; x--) {
    for (let y = 17; y >= 0; y--) {
      if (grid[y][x] === 3) {
        threePresent = true;
      }
    }
  }
  if (threePresent === true) {
    for (let x = 9; x >= 0; x--) {
      for (let y = 17; y >= 0; y--) {
        if (grid[y][x] === 3 || grid[y][x] === 1) {
          grid[y][x] = 2;
        }
      }
    }
    spaceFree = true;
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    right:
    for (let x = 9; x >= 0; x--) {
      for (let y = 17; y >= 0; y--) {
        if (grid[y][x] === 1 && grid[y][x + 1] !== 2) {
          grid[y][x + 1] = 1;
          grid[y][x] = 0;
        } else if (grid[y][x] === 1 && grid[y][x + 1] === 2) {
          break right;
        }
      }
    }
  }
  if (keyCode === LEFT_ARROW) {
    left:
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 18; y++) {
        if (grid[y][x] === 1 && grid[y][x - 1] !== 2) {
          grid[y][x - 1] = 1;
          grid[y][x] = 0;
        } else if (grid[y][x] === 1 && grid[y][x - 1] === 2) {
          break left;
        }
      }
    }
  }
  if (keyCode === DOWN_ARROW) {

  }
}

function death() {

}


// Loop //
function draw() {
  if (startScreenOn === true) {
    displayStartScreen()
  }
  if (gameScreenOn === true) {
    displayGameScreen()
  }
}
