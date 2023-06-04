// 获取画布和重新开始按钮
var canvas = document.getElementById("canvas");
var restartButton = document.getElementById("restartButton");
var jumpButton = document.getElementById("jumpButton");
// 获取画布的上下文
var ctx = canvas.getContext("2d");

// 小恐龙对象
var dino = {
  x: 50,
  y: 125,
  width: 50,
  height: 50,
jump: function() {
  this.y -= 50;
}
 ,
  draw: function() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

// 障碍物对象
var obstacle = {
  x: canvas.width - 10,
  y: 130,
  width: 10,
  height: 20,
  draw: function() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

// 分数
var score = 0;

// 游戏结束标志
var gameOver = false;

// 更新画面
function update() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制小恐龙和障碍物
  dino.draw();
  obstacle.draw();

  // 更新障碍物的位置
  obstacle.x -= 5;

  // 检测小恐龙是否碰到障碍物
  if (dino.x < obstacle.x + obstacle.width && dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height && dino.y + dino.height > obstacle.y) {
    gameOver = true;
  }

  // 绘制分数
  ctx.fillText("Score: " + score, 10, 20);

  // 更新分数并增加小恐龙的奔跑速度
  score += 1;
  dino.x += 3;

  // 检测小恐龙是否触底
  if (dino.y + dino.height < canvas.height) {
    dino.y += 2;
  }

  // 如果游戏未结束，则继续更新画面
  if (!gameOver) {
    requestAnimationFrame(update);
  } else {
    // 显示重新开始按钮
    restartButton.style.display = "block";
  }
}

// 监听键盘按下事件
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 32) {
    // 当按下的键码为32时，让小恐龙跳跃
    dino.jump();
  }
});

// 监听键盘松开事件
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 32) {
    // 当松开的键码为32时，让小恐龙回落
    dino.y += 50;
  }
});

// 监听跳跃按钮的点击事件
jumpButton.onclick = function() {
  dino.jump();
};
// 监听重新开始按钮的点击事件
restartButton.onclick = function() {
  restartGame();
};

// 监听快捷键 Ctrl + P
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.keyCode === 80) {
    // 当按下的键为 Ctrl + P 时，调用重新开始游戏函数
    restartGame();
  }
});

// 重新开始游戏
function restartGame() {
  // 隐藏重新开始按钮
  restartButton.style.display = "none";

  // 重新开始游戏
  score = 0;
  gameOver = false;
  dino.x = 50;
  dino.y = 125;

  // 重新生成障碍物
  obstacle.x = canvas.width - 10;
  obstacle.y = 130;

  // 继续更新画面
  update();
}

// 开始游戏
update();