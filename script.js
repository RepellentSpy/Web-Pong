const gameContainer = document.getElementById("game-container"); // Define game container
const paddle1 = document.getElementById("paddle1_box"); // define paddle1 box
const paddle2 = document.getElementById("paddle2_box"); // define paddle2 box

const paddle1_hitbox = document.getElementById("paddle1"); // define paddle 1 hitbox
const paddle2_hitbox = document.getElementById("paddle2"); // define paddle 2 hitbox

const ball = document.getElementById("ball"); // define ball

// Set the initial position of the ball
let ballX = gameContainer.offsetWidth / 2;
let ballY = gameContainer.offsetHeight / 2;

// Set the initial speed of the ball
let ballSpeedX = 1;
let ballSpeedY = 1;

// Set the initial position of the paddles
let paddle1Y = gameContainer.offsetHeight / 2 - paddle1.offsetHeight / 2;
let paddle2Y = gameContainer.offsetHeight / 2 - paddle2.offsetHeight / 2;

// Set the score
let score1 = 0;
let score2 = 0;

// Add event listeners to the paddles
paddle1.addEventListener("mousemove", (e) => {
  paddle1Y = e.clientY - paddle1.offsetHeight / 2;
  paddle1.style.top = paddle1Y + "px";
});

paddle2.addEventListener("mousemove", (e) => {
  paddle2Y = e.clientY - paddle2.offsetHeight / 2;
  paddle2.style.top = paddle2Y + "px";
});

// Update the game loop
function gameLoop() {
  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check if the ball has hit the top or bottom of the game container
  if (ballY < 0 || ballY > gameContainer.offsetHeight) {
    ballSpeedY *= -1;
  }

  // Check if the ball has hit a paddle
  if (ballX < paddle1_hitbox.offsetLeft + paddle1_hitbox.offsetWidth && ballY > paddle1Y && ballY < paddle1Y + paddle1_hitbox.offsetHeight) {
    ballSpeedX *= -1;
  }

  if (ballX > 760 && ballY > paddle2Y && ballY < paddle2Y + paddle2_hitbox.offsetHeight) {
    ballSpeedX *= -1;
  }

  // Check if the ball has gone off the left or right side of the game container
  if (ballX < 0) {
    score2++;
    ballX = gameContainer.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2;
    ballSpeedX *= -1;
  }

  if (ballX > gameContainer.offsetWidth) {
    score1++;
    ballX = gameContainer.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2;
    ballSpeedX *= -1;
  }

  // Update the position of the ball
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

function startGame() {
  gameLoop();
  console.log("Game started")
}