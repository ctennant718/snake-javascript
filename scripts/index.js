//selecting DOM elements
const playArea = document.querySelector(".play-area");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelector(".controls i");

//initial variables set
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, verlocityY = 0;
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
}

//handle game over
