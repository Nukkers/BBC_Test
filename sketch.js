function setup() {
  // put setup code here
  createCanvas(1000, 800);
}

function draw() {
  // put drawing code here


  if(mouseIsPressed){
    fill(0);
  } else {
    fill(244);
  }

  ellipse(mouseX, mouseY, 80, 80);
}