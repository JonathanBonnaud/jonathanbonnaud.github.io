/**
* @file Depth-first search recursive backtracker - https://en.wikipedia.org/wiki/Maze_generation_algorithm
* @author Jonathan Bonnaud
* @since 20/12/2016
* @class
* @classdesc Cell - is a grid cell of the maze
*/

/**
* @constructs
* @function Cell(i, j)
* @param {int} i - coordinate x in the maze
* @param {int} j - coordinate y in the maze
* @see Player
*/
function Cell(i, j) {
	this.i = i; //abscisse x
	this.j = j; //ordonnée y
	this.walls = [true, true, true, true];
				//top, bottom, left, right
	this.visited = false;
	this.startCell = false;
	this.endCell = false;

	this.show = function() {
		var x = this.i*w;
		var y = this.j*w;

		stroke(255);
		if(this.walls[0]) {
			line(x, y, x+w, y); //top line
		}
		if(this.walls[1]) {
			line(x, y+w, x+w, y+w); //bottom line
		}
		if(this.walls[2]) {
			line(x, y, x, y+w); //left line
		}
		if(this.walls[3]) {
			line(x+w, y, x+w, y+w); //right line
		}

		if(this.visited) {
			noStroke(); //pas de bordure
			fill('rgba(20,20,200, 0.5)');
			//fill(0, 0, 255, 100); //blue
			rect(x, y, w, w); //rect(xPosition, yPosition, height, width)
		}
	}

	this.showStartEnd = function() {
		var x = this.i*w;
		var y = this.j*w;

		if(this.startCell) {
			fill('rgb(250,10,10)');
			ellipse(x+w/2, y+w/2, w-5, w-5);
			fill(0);
			text("S", x+w/3, y+w/1.5);
		}

		if(this.endCell) {
			fill('rgb(10,250,10)');
			ellipse(x+w/2, y+w/2, w-5, w-5);
			fill(0);
			text("E", x+w/3, y+w/1.5);
		}
	}

	this.checkNeighbors = function() {
		var neighbors = [];

		var top = grid[index(this.i, this.j-1)];
		var bottom = grid[index(this.i, this.j+1)];
		var left = grid[index(this.i-1, this.j)];
		var right = grid[index(this.i+1, this.j)];

		if(top && !top.visited) {
			neighbors.push(top);
		}
		if(bottom && !bottom.visited) {
			neighbors.push(bottom);
		}
		if(left && !left.visited) {
			neighbors.push(left);
		}
		if(right && !right.visited) {
			neighbors.push(right);
		}

		if(neighbors.length > 0) {
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}
	}

	this.highlight = function() {
		var x = this.i*w;
		var y = this.j*w;

		noStroke(); //pas de bordure
		fill('rgba(0,255,0, 0.25)');
		//fill(0, 0, 200, 180); //blue
		rect(x, y, w, w);
	}
}

function index(i, j) {
	if (i < 0 || j < 0  || i > cols-1 || j > rows-1) { //prevent from getting out of bound
		return -1;
	}
	return i + j * cols;
}