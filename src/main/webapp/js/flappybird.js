
//board
let board;
let boardWidth = 540;
let boardHeight = 800;
let context;
//bird
let birdWidth = 34;
let birdHeight = 34;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
	x: birdX,
	y: birdY,
	width: birdWidth,
	height: birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 648;
let pipeX = boardWidth;
let pipeY = 0;

let topPineImg;
let bottomPineImg;

//physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
		
   		setGames();
		flappy();
        

}

function flappy(){
	board = document.getElementById("board");
	board.height = boardHeight;
	board.width = boardWidth;
	context = board.getContext("2d")

	//draw bird 
	//context.fillStyle = "green";
	//context.fillRect(bird.x, bird.y, bird.width, bird.height);

	//load image
	birdImg = new Image();
	birdImg.src = "https://flappycreator.com/default/bird_sing.png";
	birdImg.onload = function() {
		context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
	}
	topPineImg = new Image();
	topPineImg.src = "https://flappycreator.com/default/tube1.png"
	bottomPineImg = new Image();
	bottomPineImg.src = "https://flappycreator.com/default/tube2.png"


	requestAnimationFrame(update);
	setInterval(placePipes, 1500);
	document.addEventListener("keydown", moveBird);

}

function update() {
	requestAnimationFrame(update)
	if (gameOver) {
		return;
	}
	context.clearRect(0, 0, board.width, board.height);

	//bird
	velocityY += gravity;
	bird.y = Math.max(bird.y + velocityY, 0);

	context.drawImage(birdImg, bird.x, bird.y, bird.height, bird.width);

	if (bird.y > board.height) {
		gameOver = true;
	}

	//pipes
	for (let i = 0; i < pipeArray.length; i++) {
		let pipe = pipeArray[i];
		pipe.x += velocityX;
		context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

		if (!pipe.passed && bird.x > pipe.x + pipe.width) {
			score += 0.5;
			pipe.passed = true;
		}
		if (detectCollision(bird, pipe)) {
			gameOver = true;
		}
	}
	//clear pipe
	while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
		pipeArray.shift()
	}

	// score
	context.fillStyle = "white";
	context.font = "45px sans-serif";
	context.fillText(score, 5, 45);
	if (gameOver) {
		context.fillText("GAME OVER", 5, 90)
	}

}
function placePipes() {
	if (gameOver) {
		return;
	}

	let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
	let openingSpace = board.height / 4;

	let topPipe = {
		img: topPineImg,
		x: pipeX,
		y: randomPipeY,
		width: pipeWidth,
		height: pipeHeight,
		passed: false
	}
	pipeArray.push(topPipe);

	let bottomPipe = {
		img: bottomPineImg,
		x: pipeX,
		y: randomPipeY + pipeHeight + openingSpace,
		width: pipeWidth,
		height: pipeHeight,
		passed: false
	}
	pipeArray.push(bottomPipe);
}
function moveBird(e) {
	if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
		//jump
		velocityY = -6;

		//Reset

		if (gameOver) {
			bird.y = birdY;
			pipeArray = [];
			score = 0;
			gameOver = false;
		}
	}
}
function detectCollision(a, b) {
	return a.x < b.x + b.width &&
		a.x + a.width > b.x &&
		a.y < b.y + b.height &&
		a.y + a.height > b.y;
}