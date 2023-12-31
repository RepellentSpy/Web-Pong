const gameContainer = document.getElementById("game-container"); // Define game container

// paddles
const paddle1 = document.getElementById("paddle1_box"); // define paddle1 box
const paddle2 = document.getElementById("paddle2_box"); // define paddle2 box
const paddle1_hitbox = document.getElementById("paddle1"); // define paddle 1 hitbox
const paddle2_hitbox = document.getElementById("paddle2"); // define paddle 2 hitbox

const ball = document.getElementById("ball"); // define ball

// Definitions ↑↑↑
// -----------------------------------------------------------------------------------
// Game logic ↓↓↓

// Set the initial position of the ball
let ballX = gameContainer.offsetWidth / 2;
let ballY = gameContainer.offsetHeight / 2;

// Set the initial speed of the ball
let ballSpeedX = 3;
let ballSpeedY = 3;

// Set the initial position of the paddles
let paddle1Y = gameContainer.offsetHeight / 2 - paddle1.offsetHeight / 2;
let paddle2Y = gameContainer.offsetHeight / 2 - paddle2.offsetHeight / 2;

// Set the initial score
let score1 = 0;
let score2 = 0;

// Add event listeners to the paddles that allow the paddles to move with mouse
paddle1.addEventListener("mousemove", (e) => {
  paddle1Y = Math.min(e.clientY - paddle1.offsetHeight / 2, 500); // minimum makes sure the paddle doesn't leave the gamebox
  paddle1.style.top = paddle1Y + "px";
});

paddle2.addEventListener("mousemove", (e) => {
  paddle2Y = Math.min(e.clientY - paddle2.offsetHeight / 2, 500);
  paddle2.style.top = paddle2Y + "px";
});

// Update the game loop
function gameLoop() {
  document.getElementById("ball").style.animation = "1s ball_zoom forwards"; // ball animation when ball spawns
  // Launch the ball
  setTimeout(() => { // waits 1200ms before launching the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  }, 1200);
  

  // Check if the ball has hit the top or bottom of the game container
  if (ballY < 0 || ballY > gameContainer.offsetHeight - 15) {
    ballSpeedY *= -1; // change direction
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
    score2++; //add to player 2's score
    document.getElementById("game-container").style.animation = "0.2s shake forwards" // box shakes
    setTimeout(() => {
      document.getElementById("game-container").style.animation = ""
    }, 210);
    document.getElementById("score_player2").style.animation = "0.5s number_change_player2 forwards";
    document.getElementById("score_player2").innerHTML = score2; // changes the score text
    setTimeout(() => {
      document.getElementById("score_player2").style.animation = "";
    }, 600);

    ballX = gameContainer.offsetWidth / 2; // reset ball to default coords
    ballY = gameContainer.offsetHeight / 2; // reset ball to default coords
    ballSpeedX = -2;
    ballSpeedX *= -1; // change ball direction
  }

  if (ballX > gameContainer.offsetWidth) {
    score1++;
    document.getElementById("game-container").style.animation = "0.2s shake forwards" // box shakes
    setTimeout(() => {
      document.getElementById("game-container").style.animation = ""
    }, 210);
    document.getElementById("score_player1").style.animation = "0.5s number_change_player1 forwards";
    document.getElementById("score_player1").innerHTML = score1; // change the score text
    setTimeout(() => {
      document.getElementById("score_player1").style.animation = "";
    }, 600);

    ballX = gameContainer.offsetWidth / 2; // reset ball to default coords
    ballY = gameContainer.offsetHeight / 2; // reset ball to default coords
    ballSpeedX = 2;
    ballSpeedX *= -1; // reverse the ball
  }

  // Update the position of the ball
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // Request the next animation frame
  requestAnimationFrame(gameLoop);
}

// Game logic ↑↑↑
// ----------------------------------------------------------------------------
// Beginning of the game ↓↓↓

function startGame() { // Starts the game
  document.getElementById("start_game_button").disabled = true;
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

// Beginning of the game ↑↑↑
// ----------------------------------------------------------------------------
// Misc ↓↓↓ 

function toggleDarkMode() { // To-Do: make this a toggle, add cookies to remember preference
  setTimeout(() => {
    document.body.style.animation = "1.2s dark_mode_change forwards";
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    document.getElementById("labs_icon").src = "images/experiment_tube_white.svg";
    document.getElementById("back_text").style.color = "#8d8df1";

    document.getElementById("start_game_button").style.animation = "1.2s dark_mode_change_buttons forwards";
    document.getElementById("dark_mode_button").style.animation = "1.2s dark_mode_change_buttons forwards";

    document.getElementById("round_ball_button").style.animation = "1.2s dark_mode_change_buttons forwards";
    document.getElementById("square_ball_button").style.animation = "1.2s dark_mode_change_buttons forwards";

    document.getElementById("round_ball_icon").style.animation = "1.2s dark_mode_ball_icons_change forwards";
    document.getElementById("square_ball_icon").style.animation = "1.2s dark_mode_ball_icons_change forwards";
  }, 200);
}

function roundBall() {
  document.getElementById("ball").style.borderRadius = "";
  document.getElementById("ball").style.borderRadius = "999px";
}

function squareBall() {
  document.getElementById("ball").style.borderRadius = "";
  document.getElementById("ball").style.borderRadius = "0";
}