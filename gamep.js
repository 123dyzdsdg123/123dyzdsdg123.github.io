const gameBoard = document.getElementById('game-board');
const dino = document.getElementById('dino');
const jumpButton = document.getElementById('jump-button');
const restartButton = document.getElementById('restart-button');
let isPlaying = false;
let isJumping = false;
let dinoPosition = 0;
let gravity = 0.9;
let jumpSpeed = 15;
let obstacleSpeed = 10;
let obstacleInterval = 1500;
let obstacleTimer;
let score = 0;

jumpButton.addEventListener('click', jump);
restartButton.addEventListener('click', () => {
  location.reload();
});

jump();

function jump() {
  isJumping = true;
  let upTimer = setInterval(() => {
    if (dinoPosition >= 150) {
      clearInterval(upTimer);
      let downTimer = setInterval(() => {
        if (dinoPosition <= 0) {
          clearInterval(downTimer);
          isJumping = false;
        }
        dinoPosition -= jumpSpeed;
        dino.style.bottom = dinoPosition + 'px';
      }, 20);
      return;
    }
    dinoPosition += jumpSpeed;
    dino.style.bottom = dinoPosition + 'px';
  }, 20);
}

function createObstacle() {
  let obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  gameBoard.appendChild(obstacle);
  let obstaclePosition = gameBoard.offsetWidth;
  obstacle.style.left = obstaclePosition + 'px';

  let moveTimer = setInterval(() => {
    if (obstaclePosition < 0) {
      clearInterval(moveTimer);
      gameBoard.removeChild(obstacle);
      score++;
      obstacleInterval -= 50;
      obstacleSpeed += 0.5;
      clearInterval(obstacleTimer);
      obstacleTimer = setInterval(createObstacle, obstacleInterval);
      return;
    }

    if (dinoPosition < 50 && obstaclePosition > 0 && obstaclePosition < 50) {
      clearInterval(obstacleTimer);
      clearInterval(moveTimer);
      alert('游戏结束，得分：' + score);
      location.reload();
      return;
    }

    obstaclePosition -= obstacleSpeed;
    obstacle.style.left = obstaclePosition + 'px';
  }, 20);
}

obstacleTimer = setInterval(createObstacle, obstacleInterval);