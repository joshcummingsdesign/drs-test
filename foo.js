const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
let score = 0;

function randomPosition() {
  const maxX = window.innerWidth - 50;
  const maxY = window.innerHeight - 50;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  box.style.left = x + "px";
  box.style.top = y + "px";
}

box.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = "Score: " + score;
  randomPosition();
});

// Move box to random position every 1 second
setInterval(randomPosition, 1000);

randomPosition();
