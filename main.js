document.addEventListener("DOMContentLoaded", () => {
  const restartBtn = document.querySelector(".restartBtn");
  const boxes = document.querySelectorAll(".box");
  const gameboard = document.getElementById("gameboard");
  const winnerMessage = document.querySelector(".winner-message");

  let currentPlayer = "X";
  let gameboardState = ["", "", "", "", "", "", "", "", ""];
  let winningLine;

  function playClickSound() {
    var audio = document.getElementById("clickSound");
    audio.play();
  }

  // Add click event listener to the document body
  document.body.addEventListener("click", playClickSound);

  restartBtn.addEventListener("click", restartGame);
  gameboard.addEventListener("click", handleBoxClick);

  function handleBoxClick(event) {
    const clickedBox = event.target;
    const boxIndex = clickedBox.id;

    if (gameboardState[boxIndex] === "" && !isGameOver()) {
      gameboardState[boxIndex] = currentPlayer;
      updateBox(clickedBox);

      const winnerPattern = checkWinner();
      if (winnerPattern) {
        displayWinner(winnerPattern);
        showWinnerMessage(`${currentPlayer} wins!`);
        winningLine = winnerPattern;
      } else if (isBoardFull()) {
        showWinnerMessage("It's a tie!");
      } else {
        togglePlayer();
      }
    }
  }

  function updateBox(box) {
    box.textContent = currentPlayer;
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameboardState[a] &&
        gameboardState[a] === gameboardState[b] &&
        gameboardState[a] === gameboardState[c]
      ) {
        return pattern;
      }
    }

    return null;
  }

  function isBoardFull() {
    return gameboardState.every((cell) => cell !== "");
  }

  function isGameOver() {
    return checkWinner() || isBoardFull();
  }

  function displayWinner(winningPattern) {
    for (const index of winningPattern) {
      boxes[index].classList.add("winner-box");
    }
    if (winningLine) {
      drawWinningLine(winningLine);
    }
  }

  function drawWinningLine(pattern) {
    const line = document.createElement("div");
    line.classList.add("winning-line");

    const [a, b, c] = pattern;
    const boxA = boxes[a].getBoundingClientRect();
    const boxB = boxes[b].getBoundingClientRect();
    const boxC = boxes[c].getBoundingClientRect();

    const centerX =
      (boxA.left +
        boxA.right +
        boxB.left +
        boxB.right +
        boxC.left +
        boxC.right) /
      6;
    const centerY =
      (boxA.top +
        boxA.bottom +
        boxB.top +
        boxB.bottom +
        boxC.top +
        boxC.bottom) /
      6;

    line.style.left = `${centerX - line.offsetWidth / 2}px`;
    line.style.top = `${centerY - line.offsetHeight / 2}px`;

    document.body.appendChild(line);
  }

  function showWinnerMessage(message) {
    winnerMessage.textContent = message;
  }

  function restartGame() {
    gameboardState = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("winner-box");
    });
    currentPlayer = "X";
    winnerMessage.textContent = "";
    if (winningLine) {
      document.querySelector(".winning-line")?.remove();
      winningLine = null;
    }
  }
});

function playWinSound() {
  const winSound = document.getElementById("winSound");
  winSound.currentTime = 0;
  winSound.play();
}

if (gameResult === "x" || gameResult === "0") {
  playWinSound();
}
