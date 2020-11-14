new p5();

const WIDTH = 640;
const HEIGHT = 480;

const SPACE = 60;
const SPEED = 10; // the higher value, the slower speed

const CHILD_BASE_X = 600;
const CHILD_BASE_Y = 40;
const CHILD_COUNT = 8;

function getRandomColor() {
  return random(0, 255);
}

function getNextPosition(from, to) {
  if (from != to) {
    return from + ((to - from) / SPEED);
  }
  return to;
}

class Parent {
  constructor() {
    this.x = 50;
    this.y = 240;
    this.r = 25;
    this.colors = [];
    for (let i = 0; i<3; i++) {
      this.colors[i] = getRandomColor();
    }
  }
}

class Child {
  constructor() {
    this.x = random(0, WIDTH);
    this.y = random(0, HEIGHT);
    this.r = 25;
    this.colors = [];
    for (let i = 0; i<3; i++) {
      this.colors[i] = getRandomColor();
    }
  }
}

const parent = new Parent();
const children = [];

function setup() {
  createCanvas(640, 480);
  noStroke();
  for (let i = 0; i < CHILD_COUNT; i++) {
    children[i] = new Child();
  }
  frameRate(60);  
}

function draw() {
  background(0);

  // parent ellipse
  fill(parent.colors[0], parent.colors[1], parent.colors[2]);
  ellipse(parent.x, parent.y, parent.r*2, parent.r*2);
  
  // child ellipses
  for (let i = 0; i < CHILD_COUNT; i++) {
    const child = children[i];
    fill(child.colors[0], child.colors[1], child.colors[2]);
    ellipse(child.x, child.y, child.r*2, child.r*2);
  }
  
  if (mouseX >= parent.x - parent.r && mouseX <= parent.x + parent.r && mouseY >= parent.y - parent.r && mouseY <= parent.y + parent.r) {
    let targetX, targetY;
    // when onmouseover
    for (let i = 0; i < CHILD_COUNT; i++) {
      if (i == 0) {
        targetX = parent.x + SPACE;
        targetY = parent.y;
      } else {
        targetX = children[i-1].x + SPACE;
        targetY = children[i-1].y;
      }
    
      const child = children[i];
      if (child.x != targetX) {
        child.x = getNextPosition(child.x, targetX);
      }
      if (child.y != targetY) {
        child.y = getNextPosition(child.y, targetY);
      }
    }
  } else {
    // when onmouseout
    for (let i = 0; i < CHILD_COUNT; i++) {
      if (i == 0) {
        targetX = CHILD_BASE_X;
        targetY = CHILD_BASE_Y;
      } else {
        targetX = children[i-1].x;
        targetY = children[i-1].y;
      }
      const child = children[i];
      if (child.x != targetX) {
        child.x = getNextPosition(child.x, targetX);
      }
      if (child.y != targetY) {
        child.y = getNextPosition(child.y, targetY);
      }
    }
  }
}