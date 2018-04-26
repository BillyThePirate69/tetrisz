function spawnShape(){
  if (currentShape === 'I'){
    let shapeGrid =  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    ];
  else if (currentShape === 'L'){
    let shapeGrid =  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
    ];
  }
  else if (currentShape === 'Z'){
    let shapeGrid = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
    ];
  }
  else if (currentShape === 'square'){
    let shapeGrid =  [
    [1, 1],
    [1, 1],
    ];
  }
  else if (currentShape === 'S'){
    let shapeGrid =  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
    ];
  }
  else if (currentShape === 'J'){
    let shapeGrid =  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
    ];
  }
  else if (currentShape === 'T'){
    let shapeGrid =  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
    ];
  }
}
