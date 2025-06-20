const biteSound = document.getElementById("biteSound");
const thudSound = document.getElementById("thudSound");
const clickSound = document.getElementById("clickSound");
const restartSound = document.getElementById("restartSound");
const turnSound = document.getElementById("turnSound");

const overlay = document.getElementById("gameOverOverlay");
const restartBtn = document.getElementById("restartBtn");
const startBtn = document.getElementById("startBtn");
const mainMenu = document.getElementById("menu");
const scoreBoard = document.getElementById("scoreBoard");

const returnToMenuBtn = document.getElementById("returnToMenu");

const savedHighScore = localStorage.getItem("highScore") || 0;
document.getElementById(
  "highScore"
).innerHTML = `<i class="fa-solid fa-trophy" style="color: #ffd700;"></i> High Score: ${savedHighScore}`;
// Get the canvas element
const canvas = document.getElementById("gameCanvas");

// Get the 2D drawing context
const ctx = canvas.getContext("2d");

function clearCanvas() {
  // Draw a white rectangle covering the entire canvas
  ctx.fillStyle = "#f0f0f0";
  // Draw a black border around the rectangle
  ctx.strokeStyle = "black";

  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// Representing snake
let snake = [
  {
    x: 150,
    y: 150,
  },
  {
    x: 140,
    y: 150,
  },
  {
    x: 130,
    y: 150,
  },
  {
    x: 120,
    y: 150,
  },
  {
    x: 110,
    y: 150,
  },
];

let score = 0;

function drawSnakePart(snakePart) {
  ctx.fillStyle = "lightgreen";
  ctx.strokeStyle = "darkgreen";

  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function drawSnake() {
  snake.forEach(drawSnakePart);
}
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changingDirection) return; // Prevent changing twice per frame
  changingDirection = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    turnSound.currentTime = 0;
    turnSound.play();
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    turnSound.currentTime = 0;
    turnSound.play();
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    turnSound.currentTime = 0;
    turnSound.play();
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    turnSound.currentTime = 0;
    turnSound.play();
    dx = 0;
    dy = 10;
  }
}

let dx = 0;
let dy = -10;

let changingDirection = false;

function advanceSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  };
  snake.unshift(head); // Add new head to beginning of snake array

  const didEatFood = snake[0].x === foodX && snake[0].y == foodY;
  if (didEatFood) {
    biteSound.currentTime = 0;
    biteSound.play();
    score += 10;
    document.getElementById("score").innerHTML = score;
    document.getElementById("finalScore").innerHTML = "Final Score: " + score;

    createFood(); // Generate new location for food.
  } else {
    snake.pop(); // Remove tail
  }
}

function randomTen(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
  foodX = randomTen(0, gameCanvas.width - 10);
  foodY = randomTen(0, gameCanvas.height - 10);

  snake.forEach(function isFoodOnSnake(part) {
    const foodIsOnSnake = part.x == foodX && part.y == foodY;

    if (foodIsOnSnake) {
      createFood();
    }
  });
}
// Draw food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "darkred";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y; // Check if head touches another part of snake
    snake[i].y === snake[0].y;
    if (didCollide) return true;
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}
function resetGame() {
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
  dx = 10;
  dy = 0;
  score = 0;
  document.getElementById("score").innerHTML = score;
  document.getElementById("finalScore").innerHTML = "Final Score: " + score;
  createFood();
}

restartBtn.addEventListener("click", function () {
  restartSound.currentTime = 0;
  restartSound.play();
  overlay.classList.add("hidden"); // Hide game over overlay
  resetGame();
  main();
});
returnToMenuBtn.addEventListener("click", function () {
  clickSound.currentTime = 0;
  clickSound.play();
  overlay.classList.add("hidden"); // Hide game over overlay
  mainMenu.style.display = "block";
  canvas.style.display = "none";
  scoreBoard.style.display = "none";
  resetGame();
});
startBtn.addEventListener("click", function () {
  clickSound.currentTime = 0;
  clickSound.play();
  mainMenu.style.display = "none";
  scoreBoard.style.display = "block";
  canvas.style.display = "block";
  document.getElementById("gameContainer").style.display = "block";
  main(); // Start game loop
});

function main() {
  if (didGameEnd()) {
    thudSound.currentTime = 0;
    thudSound.play();
    overlay.classList.remove("hidden");

    const highScore = localStorage.getItem("highScore") || 0;

    if (score > highScore) {
      localStorage.setItem("highScore", score);
      document.getElementById(
        "highScore"
      ).innerHTML = `<i class="fa-solid fa-trophy" style="color: #ffd700;"></i> High Score: ${score}`;
      document.getElementById("highScore").innerHTML = "High Score: " + score;
      document.getElementById(
        "finalScore"
      ).innerHTML = `<i class="fa-solid fa-trophy" style="color: #ffd700;"></i> New High Score: ${score}`;
    } else {
      document.getElementById(
        "highScore"
      ).innerHTML = `<i class="fa-solid fa-trophy" style="color: #ffd700;"></i> High Score: ${highScore}`;
    }
    return; // Stop the loop if game over
  }
  setTimeout(function onTick() {
    changingDirection = false;
    clearCanvas(); // Clear previous frame
    drawFood(); // Draw food
    advanceSnake(); // Update snake position
    drawSnake(); // Draw updated snake

    main(); // Schedule the next frame
  }, 100);
}

document.addEventListener("keydown", changeDirection);
createFood();
