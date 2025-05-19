// Get the canvas element
const canvas = document.getElementById("gameCanvas");

// Get the 2D drawing context
const ctx = canvas.getContext("2d");

// Draw a white rectangle covering the entire canvas
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 300, 300);

// Draw a black border around the rectangle
ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, 300, 300);

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
drawSnake();
