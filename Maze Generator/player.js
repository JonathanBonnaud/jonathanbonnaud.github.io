/**
* @file Depth-first search recursive backtracker - https://en.wikipedia.org/wiki/Maze_generation_algorithm
* @author Jonathan Bonnaud
* @since 21/12/2016
* @class
* @classdesc Player - is the img sprite of the player's avatar
*/

/**
* @constructs
* @function Player(img, w)
* @param {Image} img - image of the avatar
* @param {int} w - width of a cell in the maze
* @see Cell
*/
function Player(img, w) {
	this.i = 0;
	this.j = 0;
	this.w = w;
	this.img = img;

	this.startPositon = function(i, j, w) {
		this.i = i;
		this.j = j;
		this.w = w;
	}

	this.show = function() {
		image(this.img, this.i, this.j, this.w, this.w);
	}

	/**
	* @function move(i, j, d)
	* @param {int} i - destination cell absciss
	* @param {int} j - destination cell ordinate
	* @param {int} d - direction
	* @desc allows the player to move from one cell to another
	*		according to the maze, if there's a wall or not
	*/
	this.move = function(i, j, d) {
		if(grid[index(this.i/w,this.j/w)].walls[d] === false) {
			this.i = i;
			this.j = j;
		}
		else {
			//console.log("Il y a un mur");
		}
	}
}

function keyPressed() {
	if (keyCode == RIGHT_ARROW) {
		player.move(player.i+w, player.j, 3);
	}
	if (keyCode == LEFT_ARROW) {
		player.move(player.i-w, player.j, 2);
	}
	if (keyCode == UP_ARROW) {
		player.move(player.i, player.j-w, 0);
	}
	if (keyCode == DOWN_ARROW) {
		player.move(player.i, player.j+w, 1);
	}
}