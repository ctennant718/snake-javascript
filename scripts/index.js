//selecting DOM elements
const playArea = document.querySelector(".play-area");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelector(".controls i");

//initial variables set
let gameOver = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 5;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

//get high score from local storage
let highScore = locaStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

//initial food position
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

//handle game over
const handleGameOver = () => {
  clearInterval(setInterval);
  alert("Game over! Press OK to replay!");
  location.reload();
};

// change velocity value based on key presses
const changeDirection = (e) => {
  if (e.key === "arrow-up" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "arrow-down" && velocityY != -1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "arrow-left" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "arrow-right" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

//add event listener on each key press for direction (for of?)
controls.forEach((button) =>
  button.addEventListener("click", () =>
    changeDirection({ key: button.dataset.key }),
  ),
);

const startGame = () => {
  if (gameOver) return handleGameOver();
  let html = `<div class="food" style="grid-area ${foodY} / ${foodX}"></div>`;
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    //add food to snake body array
    snakeBody.push([foodY, foodX]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }
  //update snake head
  snakeX += velocityX;
  snakeY += velocityY;
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY];
};
