class Snake{
  constructor(x, y){
  this.x = 0;
  this.y = 0;
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.score = 0;
  this.tail = [];
}

// Detection of food consumption
  eat(pos){
    let detect = dist(this.x, this.y, pos.x, pos.y);
    if(detect < 1){
      this.score++
      return true;
    }
    else{
      return false;
    }

  }

// Constant update on snake's movement/location
update(x, y){
    for (let i=0; i<this.tail.length-1; i++){
      this.tail[i] = this.tail[i+1];
    }

    if (this.score >= 1){
      this.tail[this.score - 1] = createVector(this.x, this.y);
    }


    this.x = this.x + this.xSpeed*gridSize;
    this.y = this.y + this.ySpeed*gridSize;
    this.x = constrain(this.x, 0, width-gridSize);
    this.y = constrain(this.y, 0, height-gridSize);
  }

// Draws snake
  createSnake(){
    fill(255);
    for (let i = 0; i < this.tail.length; i++) {
      image(xd, this.tail[i].x, this.tail[i].y, gridSize, gridSize);
    }
    image(xd, this.x, this.y, gridSize, gridSize);
  }

  face(x, y){
    this.xSpeed = x;
    this.ySpeed = y;
  }

// Death screen and detection for death
  gameOver(){
    for (let i=0; i<this.tail.length; i++){
      let pos = this.tail[i];
      let detect = dist(this.x, this.y, pos.x, pos.y);
      if (detect < 1){
        this.total = 0;
        this.tail = [];
        state = 2;
      }
    }
  }

  trackScore(){
    textSize(40);
    fill(0, 120, 0);
    text(this.score, 0, 0);
  }
}
