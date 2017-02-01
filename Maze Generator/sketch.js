/**
* @author Jonathan Bonnaud
* @since 20/12/2016
* @file Depth-first search recursive backtracker - https://en.wikipedia.org/wiki/Maze_generation_algorithm
* @see Cell
* @see Player
*/

var cols; //number of cols in the maze
var rows; //number of rows in the maze
var w = 25; //width of a cell
var grid = [];
var stack = [];
var start;
var end;
var current;

var lock = 0;

var player;

var secStart=0;
var minStart=0;
var secEnd=0;
var minEnd=0;
var diffTime=0;

var menu;
var img1;
var img2;
var img3;
var img4;

/**
* @function preload()
* @desc program preload, before calling setup()
*/
function preload()
{
  // load images
  img0 = loadImage("images/player.gif");
  img1 = loadImage("images/fencer_white.gif");
  img2 = loadImage("images/boxer.gif");
  img3 = loadImage("images/usa_gymnast.gif");
  img4 = loadImage("images/olympic_karate.gif");
}

/**
* @function setup()
* @desc program setup, the first thing to do, to initialize
*/
function setup() {
  createCanvas(500, 400);
  cols = floor(width/w);
  rows = floor(height/w);

  //frameRate(500); //execution speed

  for (var y = 0; y < rows; y++) {
  	for (var x = 0; x < cols; x++) {
  		var cell = new Cell(x, y);
  		grid.push(cell);
  	}
  }

  current = grid[0];//grid[floor((random() * grid.length))];
  current.startCell = true;
  start = current;

  player  = new Player(img0, w);
  player.startPositon(start.i*w, start.j*w, w);

  //menu = createGraphics(400, 150);
}

/**
* @function draw()
* @desc program core
*/
function draw() {
  background(51);

  for (var i = 0; i < grid.length; i++) {
  	grid[i].show();
  }

  //Recursive Backtracket STEP 1
  current.visited = true;
  current.highlight();

  //Recursive Backtracket STEP 2.1.1
  var next = current.checkNeighbors();
  if(next) {
  	next.visited = true;

  	//Recursive Backtracket STEP 2.1.2
  	stack.push(current);

  	//Recursive Backtracket STEP 2.1.3
  	removeWall(current, next);

  	//Recursive Backtracket STEP 2.1.4
  	current = next;

  	if(
  		((current.i == cols-1 && current.j == rows-1 && ((current.i+current.j) - (start.i+start.j) > 10))
  		||
  		(current.i === 0 && current.j === 0 && ((current.i+current.j) - (start.i+start.j) < -10)))
  		&&
  		lock === 0
  	  ) {
  		current.endCell = true;
  		end = current;
  		lock=1;
  	}
  }
  else if(stack.length > 0){
  	//Recursive Backtracket STEP 2.2
  	current = stack.pop();
  	// if((current.i+current.j) - (start.i+start.j) > 5)
  	// 	current.endCell = true;
  }
  else {
  	if(keyIsPressed === true && lock === 1) { //to prevent it from looping
  		lock = 0;
  		secStart = second();
		minStart = minute();
  	}

  	start.showStartEnd();
  	end.showStartEnd();
	player.show();
	
	if(player.i == end.i*w && player.j == end.j*w) { //when the player reaches the end
		secEnd = second();
		minEnd = minute();
		diffTime = (minEnd*60+secEnd)-(minStart*60+secStart);
		if(diffTime < 0) diffTime = (60-minStart)*60+minEnd*60+(secEnd-secStart);
		alert("YOU WIN! \n Your time : "+diffTime+" seconds");
  		noLoop(); //to stop looping / stop the game
	}
  }

  //MENU de sélection
  /*
  menu.background('rgba(250,250,250, 1)');
  menu.text("Menu de sélection du personnage", 50, 30);
  image(menu, 100, 200);
  image(img1, 130, 250);
  image(img2, 230, 250);
  image(img3, 330, 250);
  image(img4, 430, 250);
  */
}

/*
function mouseClicked() {
	if(mouseButton == LEFT) {
		if(mouseY > 250 && mouseY < 298) {
			if(mouseX > 130 && mouseX < 178) {
				player  = new Player(img1, w);
			}
			if(mouseX > 230 && mouseX < 278) {
				player  = new Player(img2, w);
			}
			if(mouseX > 330 && mouseX < 378) {
				player  = new Player(img3, w);
			}
			if(mouseX > 430 && mouseX < 478) {
				player  = new Player(img4, w);
			}
		}
	}
}
*/

/**
* @function removeWall(a, b)
* @param {Cell} a - first cell
* @param {Cell} b - destination cell
* @desc to remove a wall when going from one celle to another
*/
function removeWall(a, b) {
	var difI = a.i - b.i;
	var difJ = a.j - b.j;
	if(difI === 1) {
		a.walls[2] = false;
		b.walls[3] = false;
	} else if(difI === -1) {
		b.walls[2] = false;
		a.walls[3] = false;
	}

	if(difJ === 1) {
		a.walls[0] = false;
		b.walls[1] = false;
	} else if(difJ === -1) {
		b.walls[0] = false;
		a.walls[1] = false;
	}
}