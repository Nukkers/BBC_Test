// Makes the 2d array for the game to be played in 
function make2DArray(cols, rows){
  let arr = new Array(cols);
  // for every column 
  for (let i = 0; i < arr.length; i++){
    // Make a new array the size of rows
    arr[i] = new Array(rows);
  }
  return arr;
}


// Holds the game grid 
let grid;
// Holds the dimensions of the grid 
let cols;
let rows;
// size of each square
let resolution = 10;


function setup() {
  // Make the canvas a square
  createCanvas(600, 400);
  // width of canvas divided by resolution
  cols = width / resolution;
  rows = height / resolution;
  // Make the grid
  grid = make2DArray(cols,rows);
  // Fill the grid with either a 0 or 1 as a starting point 
  for(let i= 0; i < cols; i++){
    for(let j= 0; j < rows; j++){
      grid[i][j] = floor(random(2)); 
    }
  }
}
  

function draw() {
  // Make the background color black
  background(0);

  // Loop through each grid element if its element value is 0 turn it black 
  // if its value is 1 turn it white
  for(let i= 0; i < cols; i++){
    for(let j= 0; j < rows; j++){
      let x = i * resolution;
      let y = j * resolution;
      
      if(grid[i][j] == 1){
        fill(255);
        // Smooths out the edges of the grid   
        stroke(0);
        // Creates a rectangle given the resolution and x and y pos
        rect(x, y, resolution -1, resolution -1);
      }     
    }
  }

  // Next generation of grid, holds the old grids new values based on neighbors 
  let next = make2DArray(cols, rows);

  // Compute next gen based on old grid 
  for(let i= 0; i < cols; i++){
    for(let j= 0; j < rows; j++){
      
      // Get the state of the current cell
      let state = grid[i][j];
        
        // count live neighbors 
        let neighbors = countNeighbors(grid, i, j);

        // Dead cell can only come to life if has three alive neighboring cells   
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          // has < 2 or > 3 alive cells therefore it dies 
          next[i][j] = 0;
        } else {
          // if its got 2 or 3 alive cells it remains alive
          next[i][j] = state;
        }
    }     
  }
  grid = next;
}

// Counts the surrounding squares of a given position on the old grid 
function countNeighbors(grid, x, y){
  let sum = 0;

  // Loop through the surrounding 8 squares, adding the value of each square
  for (let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){

      // If we hit the edge cell use the cell at position 0, grid wraps around  
      let col = ( x + i + cols) % cols;
      let row = ( y + j + rows) % rows;  

      sum += grid[col][row]; 
    }
  }
  // We dont want to count the squares own value, only the neighbors values 
  sum -= grid[x][y];

  return sum;
}