// -------------------------------
// Rock Paper Scissors (DOM version)
// -------------------------------

// Track score in one object so state is easy to read.
const gameState = {
  humanScore: 0,
  computerScore: 0,
  winningScore: 5,
};

// Build all UI using JavaScript DOM methods (no hardcoded HTML in body).
function createGameUI() {
  // Add page styles from JavaScript to keep the project self-contained.
  const style = document.createElement("style");
  style.textContent = `
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      color: #0f172a;
      display: grid;
      place-items: center;
      padding: 1rem;
    }
    .game {
      width: min(680px, 100%);
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
      padding: 1.5rem;
    }
    .title {
      margin: 0 0 0.4rem;
      text-align: center;
      font-size: 1.6rem;
    }
    .subtitle {
      margin: 0 0 1.25rem;
      text-align: center;
      color: #475569;
    }
    .controls {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    button {
      border: none;
      border-radius: 10px;
      background: #2563eb;
      color: white;
      padding: 0.85rem 0.7rem;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.08s ease, background 0.2s ease;
    }
    button:hover { background: #1d4ed8; }
    button:active { transform: translateY(1px); }
    .score {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .score-box {
      background: #f1f5f9;
      border-radius: 10px;
      padding: 0.8rem;
      text-align: center;
      font-weight: 600;
    }
    .results {
      min-height: 3rem;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 0.9rem;
      line-height: 1.4;
    }
    .winner {
      margin-top: 0.8rem;
      font-weight: 700;
      color: #166534;
    }
    .reset-wrap {
      margin-top: 1rem;
      text-align: right;
    }
    .reset-btn {
      background: #0f172a;
      width: auto;
      padding-inline: 1rem;
    }
    .reset-btn:hover {
      background: #020617;
    }
  `;
  document.head.appendChild(style);

  const app = document.createElement("main");
  app.classList.add("game");

  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Rock Paper Scissors";

  const subtitle = document.createElement("p");
  subtitle.classList.add("subtitle");
  subtitle.textContent = "First player to 5 points wins.";

  const controls = document.createElement("div");
  controls.classList.add("controls");

  const score = document.createElement("div");
  score.classList.add("score");

  const humanScoreBox = document.createElement("div");
  humanScoreBox.classList.add("score-box");
  humanScoreBox.id = "human-score";
  humanScoreBox.textContent = "You: 0";

  const computerScoreBox = document.createElement("div");
  computerScoreBox.classList.add("score-box");
  computerScoreBox.id = "computer-score";
  computerScoreBox.textContent = "Computer: 0";

  score.append(humanScoreBox, computerScoreBox);

  const results = document.createElement("div");
  results.classList.add("results");
  results.id = "results";
  results.textContent = "Choose Rock, Paper, or Scissors to start!";

  const winner = document.createElement("p");
  winner.classList.add("winner");
  winner.id = "winner";

  const resetWrap = document.createElement("div");
  resetWrap.classList.add("reset-wrap");

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("reset-btn");
  resetBtn.type = "button";
  resetBtn.textContent = "Reset Game";
  resetBtn.addEventListener("click", resetGame);

  resetWrap.appendChild(resetBtn);

  // Create move buttons with one reusable helper.
  ["rock", "paper", "scissors"].forEach((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = choice[0].toUpperCase() + choice.slice(1);
    btn.addEventListener("click", () => handleHumanTurn(choice));
    controls.appendChild(btn);
  });

  app.append(title, subtitle, controls, score, results, winner, resetWrap);
  document.body.appendChild(app);
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return `Tie! You both picked ${humanChoice}.`;
  }

  const humanWins =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  if (humanWins) {
    gameState.humanScore += 1;
    return `You win this round! ${humanChoice} beats ${computerChoice}.`;
  }

  gameState.computerScore += 1;
  return `Computer wins this round! ${computerChoice} beats ${humanChoice}.`;
}

function handleHumanTurn(humanChoice) {
  // Stop extra rounds after someone reaches the winning score.
  if (isGameOver()) return;

  const computerChoice = getComputerChoice();
  const message = playRound(humanChoice, computerChoice);

  updateUI(message);

  if (isGameOver()) {
    announceWinner();
  }
}

function isGameOver() {
  return (
    gameState.humanScore >= gameState.winningScore ||
    gameState.computerScore >= gameState.winningScore
  );
}

function updateUI(roundMessage) {
  const results = document.querySelector("#results");
  const humanScore = document.querySelector("#human-score");
  const computerScore = document.querySelector("#computer-score");

  results.textContent = roundMessage;
  humanScore.textContent = `You: ${gameState.humanScore}`;
  computerScore.textContent = `Computer: ${gameState.computerScore}`;
}

function announceWinner() {
  const winner = document.querySelector("#winner");

  if (gameState.humanScore > gameState.computerScore) {
    winner.textContent = "🎉 You won the game!";
  } else {
    winner.textContent = "🤖 Computer won the game.";
  }
}

function resetGame() {
  gameState.humanScore = 0;
  gameState.computerScore = 0;

  const winner = document.querySelector("#winner");
  winner.textContent = "";

  updateUI("Game reset. Make your move!");
}

createGameUI();
