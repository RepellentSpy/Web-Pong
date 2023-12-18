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
let ballSpeedX = 2;
let ballSpeedY = 2;

// Set the initial position of the paddles
let paddle1Y = gameContainer.offsetHeight / 2 - paddle1.offsetHeight / 2;
let paddle2Y = gameContainer.offsetHeight / 2 - paddle2.offsetHeight / 2;

// Set the initial score
let score1 = 0;
let score2 = 0;

// Add event listeners to the paddles
paddle1.addEventListener("mousemove", (e) => {
  paddle1Y = Math.min(e.clientY - paddle1.offsetHeight / 2, 500);
  paddle1.style.top = paddle1Y + "px";
});

paddle2.addEventListener("mousemove", (e) => {
  paddle2Y = Math.min(e.clientY - paddle2.offsetHeight / 2, 500);
  paddle2.style.top = paddle2Y + "px";
});

// Update the game loop
function gameLoop() {
  document.getElementById("ball").style.animation = "1s ball_zoom forwards"; // ball animation
  // Move the ball
  setTimeout(() => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  }, 1200);
  

  // Check if the ball has hit the top or bottom of the game container
  if (ballY < 0 || ballY > gameContainer.offsetHeight - 15) {
    ballSpeedY *= -1;
  }

  // Check if the ball has hit a paddle
  if (ballX < paddle1_hitbox.offsetLeft + paddle1_hitbox.offsetWidth && ballY > paddle1Y && ballY < paddle1Y + paddle1_hitbox.offsetHeight) {
    ballSpeedX *= -1.05; // Reverse direction and add a bit of speed
  }

  if (ballX > 760 && ballY > paddle2Y && ballY < paddle2Y + paddle2_hitbox.offsetHeight) {
    ballSpeedX *= -1.05; // Reverse direction and add a bit of speed
  }

  // Check if the ball has gone off the left or right side of the game container
  if (ballX < 0) {
    score2++;
    document.getElementById("game-container").style.animation = "0.2s shake forwards" // box shakes
    setTimeout(() => {
      document.getElementById("game-container").style.animation = ""
    }, 210);
    document.getElementById("score_player2").style.animation = "0.5s number_change_player2 forwards";
    document.getElementById("score_player2").innerHTML = score2;
    setTimeout(() => {
      document.getElementById("score_player2").style.animation = "";
    }, 600);

    ballX = gameContainer.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2;
    ballSpeedX = -2;
    ballSpeedX *= -1;
  }

  if (ballX > gameContainer.offsetWidth) {
    score1++;
    document.getElementById("game-container").style.animation = "0.2s shake forwards" // box shakes
    setTimeout(() => {
      document.getElementById("game-container").style.animation = ""
    }, 210);
    document.getElementById("score_player1").style.animation = "0.5s number_change_player1 forwards";
    document.getElementById("score_player1").innerHTML = score1;
    setTimeout(() => {
      document.getElementById("score_player1").style.animation = "";
    }, 600);

    ballX = gameContainer.offsetWidth / 2;
    ballY = gameContainer.offsetHeight / 2;
    ballSpeedX = 2;
    ballSpeedX *= -1;
  }

  // Update the position of the ball
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

function startGame() { // Starts the game
  setTimeout(() => { // Changes the start game button to speed the ball up
    document.getElementById("start_game_button").innerHTML = "Speed the ball up";
  }, 200);
  document.getElementById("start_game_text").style.visibility = "visible"; // sets start game text to visible
  document.getElementById("start_game_text").style.animation = "1s game_start forwards"; // adds blinking animation
  setTimeout(() => {
    document.getElementById("start_game_text").style.visibility = "hidden"; // hides the text again
  }, 1100);
  
  setTimeout(() => { // Actually starts the game
    gameLoop();
    document.getElementById("ball").style.visibility = "visible";
    console.log("Game started");
  }, 1000);

  // Sets default paddle positions
  document.getElementById("paddle1_box").style.top = "0px";
  document.getElementById("paddle2_box").style.top = "0px";
}

function buttonClicked() { // Handles animation when the start game button is clicked
  let button_clicked = true;
  if (button_clicked == true) {
    document.getElementById("start_game_button").style.animation = "0.5s button_click_reverse forwards";
  }
}