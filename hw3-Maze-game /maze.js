let maze = document.querySelector(".maze")
let ctx = maze.getContext("2d")
let current;        // Starting point of the cell

class Maze{
    constructor(size, rows, cols){
        this.size = size;
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.stack = [];    // Stack for DFS
    }
    
    // given row, col -> setup the grid and cells in it
    setup(){
        for(let i = 0; i < this.rows; i++){
            let row_cells = [];
            for(let j = 0; j < this.cols; j++){
                let cell = new Cell(i, j, this.grid, this.size);
                row_cells.push(cell);
            }
            this.grid.push(row_cells);
        }
        current = this.grid[0][0];
    }


}

// Define the individual cell
class Cell{
    // Takes a grid to reference the neighboring cells
    // grid_size gives us avg size of a single cell
    constructor(row_idx, col_idx, grid, grid_size){    
        this.row_idx = row_idx;
        this.col_idx = col_idx;
        this.grid = grid;
        this.grid_size = grid_size;
        this.visited = false;   // Initialize cell status to unvisited
        this.walls = {          // Defining cell's walls
            up_wall: true, down_wall: true, left_wall:true, right_wall:true
        };
    }

}


let maze1 = new Maze(500, 10, 10);
maze1.setup();