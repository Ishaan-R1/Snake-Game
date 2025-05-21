// Get the canvas element
const canvas = document.getElementById("gameCanvas");

// Get the 2D drawing context
const ctx = canvas.getContext("2d");

function clearCanvas() {
  // Draw a white rectangle covering the entire canvas
  ctx.fillStyle = "white";
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

function drawSnakePart(snakePart) {
  ctx.fillStyle = "lightgreen";
  ctx.strokeStyle = "darkgreen";

  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
function drawSnake() {
  snake.forEach(drawSnakePart);
}

function advanceSnake() {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  };
  snake.unshift(head);
  snake.pop();
}
clearCanvas();
// advanceSnake();

dx = 0;
dy = -10;

advanceSnake();

drawSnake();
