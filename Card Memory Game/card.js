// ======================== CARD DATA ========================
// Array containing all available card images with unique names
// Each card object has a 'name' identifier and an 'img' URL for the front face
const card_img = [
  {
    name: "card1",
    img: "https://i.pinimg.com/736x/f8/d7/7f/f8d77f4269184de99dafc98ec0b12a64.jpg",
  },
  {
    name: "card2",
    img: "https://i.pinimg.com/1200x/cf/eb/27/cfeb27bff3b29e8dddd21bed5169e24c.jpg",
  },
  {
    name: "card3",
    img: "https://i.pinimg.com/736x/ba/da/b9/badab9aa5a7a08a170a5bc27196c4d0d.jpg",
  },
  {
    name: "card4",
    img: "https://i.pinimg.com/736x/0a/98/ab/0a98ab2b6503df4d6943d69d81c67101.jpg",
  },
  {
    name: "card5",
    img: "https://i.pinimg.com/736x/a0/f7/db/a0f7db0406a7c9430c2082eecc5b1ca9.jpg",
  },
  {
    name: "card6",
    img: "https://i.pinimg.com/736x/fe/4a/da/fe4ada9d112ec573abee8e093e5d9445.jpg",
  },
  {
    name: "card7",
    img: "https://i.pinimg.com/736x/70/f5/83/70f5838a471e17698c59d753da84cdd2.jpg",
  },
  {
    name: "card8",
    img: "https://i.pinimg.com/736x/78/6b/c9/786bc9dfc614470517ebab682cb63201.jpg",
  },
  {
    name: "card9",
    img: "https://i.pinimg.com/736x/00/4a/ba/004aba72b41c4e7466c13069ee8bdc1f.jpg",
  },
  {
    name: "card10",
    img: "https://i.pinimg.com/1200x/4c/74/15/4c7415ea67d0a907bb8e29600eb1bb80.jpg",
  },
  {
    name: "card11",
    img: "https://i.pinimg.com/736x/ad/81/01/ad8101b448dd85332e75ee5c4cd1501e.jpg",
  },
  {
    name: "card12",
    img: "https://i.pinimg.com/webp/736x/41/67/e9/4167e99030267e03f2d6fb67b66588ce.webp",
  },
  {
    name: "card13",
    img: "https://i.pinimg.com/1200x/46/9c/29/469c29931c8ad211b3afa1ae07e7f7bc.jpg",
  },
  {
    name: "card14",
    img: "https://i.pinimg.com/1200x/61/57/2e/61572e00849123bd306dbd59c541f841.jpg",
  },
  {
    name: "card15",
    img: "https://i.pinimg.com/1200x/62/50/c0/6250c092420ca4780680a245fc8f42df.jpg",
  },
  {
    name: "card16",
    img: "https://i.pinimg.com/736x/50/37/56/503756713c6ddc0b815b1181392a2ed2.jpg",
  },
  {
    name: "card17",
    img: "https://i.pinimg.com/1200x/3a/33/9b/3a339be7ff37aff4520064365d46f9d7.jpg",
  },
  {
    name: "card18",
    img: "https://i.pinimg.com/736x/de/62/2a/de622a811213e7ae099f4630d0000759.jpg",
  },
  {
    name: "card19",
    img: "https://i.pinimg.com/736x/70/5a/46/705a4686fd296707b3e0372c78e3d034.jpg",
  },
  {
    name: "card20",
    img: "https://i.pinimg.com/736x/af/89/b9/af89b95e22ec715c87684620e9b29566.jpg",
  },
];

// ======================== GAME STATE VARIABLES ========================
let started = 0; // 0 = game not active, 1 = game in progress
let openedCard = []; // Array to store currently opened card elements (max 2)
let movescount = 0; // Total moves made by player
let timerInterval = null; // Reference to timer interval for stopping
let matchedPairs = 0; // Count of successfully matched pairs (used to detect win)
let totalPairs = 0; // Total number of pairs for current level

// DOM element references
const startbutton = document.getElementById("startGameBtn");
const gamebox = document.querySelector(".gamebox");
const scoreSpan = document.getElementById("move-count");
const timerElement = document.getElementById("timer");
const bestScoreSpan = document.getElementById("best-score");

// ======================== LEVEL CONFIGURATION ========================
// Each level defines the number of PAIRS (cards will be 2 * pairs)
const levels = {
  "Noob(2x2)": 2, // 2 pairs = 4 cards, grid 2x2
  "Beginner(4x4)": 4, // 4 pairs = 8 cards, grid 4x2? Actually we set dynamic columns based on sqrt logic
  "Easy(6x6)": 6, // 6 pairs = 12 cards
  "Medium(8x8)": 8, // 8 pairs = 16 cards
  "Hard(10x10)": 12, // 12 pairs = 24 cards
  "Advanced(12x12)": 18, // 18 pairs = 36 cards
  "Expert(16x16)": 24, // 24 pairs = 48 cards
};
let currentLevel = "Beginner(4x4)"; // Default starting level

// Best score persistence using localStorage
let bestScore = localStorage.getItem("memoryBestScore") || Infinity;
if (bestScore === "Infinity") bestScore = Infinity;
if (bestScore !== Infinity) {
  bestScoreSpan.innerText = bestScore < 10 ? `0${bestScore}` : bestScore;
} else {
  bestScoreSpan.innerText = "00";
}

/**
 * Updates the best score display and saves to localStorage if current moves are better
 * @param {number} currentMoves - The number of moves made in the completed game
 */
function updateBestScore(currentMoves) {
  if (currentMoves < bestScore) {
    bestScore = currentMoves;
    localStorage.setItem("memoryBestScore", bestScore);
    bestScoreSpan.innerText = bestScore < 10 ? `0${bestScore}` : bestScore;
    // Show toast for new record
    showToastMessage("🎉 New Best Score! 🎉");
  }
}

/**
 * Displays a temporary toast notification
 * @param {string} message - Message to display
 */
function showToastMessage(message) {
  const existingToast = document.querySelector(".win-toast");
  if (existingToast) existingToast.remove();
  const toast = document.createElement("div");
  toast.className = "win-toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast) toast.remove();
  }, 2000);
}

/**
 * Fisher-Yates shuffle algorithm - randomizes array order
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array (same reference)
 */
function Suffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Dynamically sets the grid columns based on total cards count
 * Creates a visually balanced grid (prefers square-like layout)
 * @param {number} totalCards - Total number of cards in the game
 */
function setDynamicGridColumns(totalCards) {
  // Calculate optimal columns: aim for sqrt(totalCards) but ensure proper fit
  let columns = Math.ceil(Math.sqrt(totalCards));
  // Adjust for wide aspect: if columns * (columns-1) >= totalCards, reduce
  while (columns > 2 && (columns - 1) * columns >= totalCards) {
    columns--;
  }
  columns = Math.max(2, columns);
  gamebox.style.gridTemplateColumns = `repeat(${columns}, minmax(75px, 85px))`;
}

/**
 * Checks if the player has won the game (all pairs matched)
 */
function checkWin() {
  if (matchedPairs === totalPairs && totalPairs > 0 && started === 1) {
    // Game finished successfully
    clearInterval(timerInterval);
    started = 0;
    startbutton.innerHTML = "Start Game";
    startbutton.style.backgroundColor = "#2e7d32";
    startbutton.style.borderColor = "green";
    startbutton.style.color = "white";

    // Update best score with current moves
    updateBestScore(movescount);

    // Show winning message
    showToastMessage(`✨ You won! Moves: ${movescount} ✨`);

    // Disable further card clicks (game ended)
  }
}

/**
 * Compares two opened cards to see if they match
 * If match: keeps flipped, increments matchedPairs
 * If mismatch: flips them back after delay
 */
function Match() {
  const [card1, card2] = openedCard;
  const name1 = card1.getAttribute("data-name");
  const name2 = card2.getAttribute("data-name");

  if (name1 === name2) {
    // Cards match! They stay flipped and become non-clickable (class flipped keeps them)
    openedCard = [];
    matchedPairs++;
    checkWin(); // After each match, verify if game is complete
  } else {
    // Mismatch: flip cards back after short delay, but prevent clicks during delay
    setTimeout(() => {
      // Ensure cards still exist and are not already removed
      if (card1 && card2) {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
      }
      openedCard = [];
    }, 1000);
  }
}

/**
 * Creates the game board based on the selected level
 * Generates cards, shuffles them, and appends to the gamebox
 */
function Gamelevel() {
  gamebox.innerHTML = ""; // Clear previous board
  openedCard = []; // Reset opened cards array
  matchedPairs = 0; // Reset matched pairs counter

  // Get number of pairs for current level
  const numberOfPairs = levels[currentLevel];
  totalPairs = numberOfPairs;

  // Select required cards from the master array (slice first N cards)
  const selectedCards = card_img.slice(0, numberOfPairs);

  // Duplicate each card to create pairs, then shuffle
  const finalcard = Suffle([...selectedCards, ...selectedCards]);

  // Set dynamic grid columns based on total cards
  setDynamicGridColumns(finalcard.length);

  // Create each card element and attach click handler
  finalcard.forEach((item) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", item.name);

    // Build card structure with front/back faces for 3D flip effect
    cardElement.innerHTML = `
            <div class="card-inner">
              <div class="front">
                <img src="${item.img}" alt="${item.name}" style="width:100%; height:100%; border-radius:10px;">
              </div>
              <div class="back"></div>
            </div>`;

    // Click handler for card flipping
    cardElement.addEventListener("click", function () {
      // Game must be active, card not already flipped, and less than 2 cards currently opened
      if (started !== 1) return;
      if (this.classList.contains("flipped")) return;
      if (openedCard.length === 2) return;

      // Flip current card
      this.classList.add("flipped");
      openedCard.push(this);

      // If two cards are now open, check for match and increment moves
      if (openedCard.length === 2) {
        movescount++;
        // Update move count display with leading zero formatting
        scoreSpan.innerText = movescount < 10 ? `0${movescount}` : movescount;
        Match(); // Evaluate match
      }
    });

    gamebox.appendChild(cardElement);
  });
}

/**
 * Starts the game timer from zero
 */
function StartTimer() {
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerElement.innerText = `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }, 1000);
}

/**
 * Stops the timer and resets timer display and move count
 * Also resets game state variables related to progress
 */
function stopAndResetTimerAndMoves() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerElement.innerText = "00:00";
  movescount = 0;
  scoreSpan.innerText = "00";
}

// ======================== EVENT LISTENERS ========================

// Start / End Game button handler
startbutton.addEventListener("click", function () {
  if (started === 0) {
    // START NEW GAME
    // Reset any ongoing timer
    if (timerInterval) clearInterval(timerInterval);
    // Reset state variables
    movescount = 0;
    matchedPairs = 0;
    scoreSpan.innerText = "00";
    // Reset the board to ensure fresh state (clears any half-flipped cards)
    Gamelevel(); // Re-render board for current level
    // Start timer and mark game as active
    StartTimer();
    started = 1;
    startbutton.innerHTML = "End Game";
    startbutton.style.backgroundColor = "red";
    startbutton.style.borderColor = "red";
    startbutton.style.color = "white";
  } else if (started === 1) {
    // END CURRENT GAME (user manually ends)
    clearInterval(timerInterval);
    timerInterval = null;
    started = 0;
    startbutton.innerHTML = "Start Game";
    startbutton.style.backgroundColor = "#2e7d32";
    startbutton.style.borderColor = "green";
    startbutton.style.color = "white";
    movescount = 0;
    scoreSpan.innerText = "00";
    timerElement.innerText = "00:00";
    matchedPairs = 0;
    // Reset board without shuffling? We'll just regenerate to clean state
    Gamelevel();
    showToastMessage("Game ended. Start new game!");
  }
});

// Level selection dropdown items
document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const newLevel = this.innerText;
    if (newLevel === currentLevel && started === 0) return;

    currentLevel = newLevel;
    // Update dropdown button text
    document.querySelector(".dropdown-toggle").innerText = currentLevel;

    // If game is active, force end current game before level change
    if (started === 1) {
      clearInterval(timerInterval);
      timerInterval = null;
      started = 0;
      startbutton.innerHTML = "Start Game";
      startbutton.style.backgroundColor = "#2e7d32";
      startbutton.style.borderColor = "green";
    }

    // Reset moves and timer display
    stopAndResetTimerAndMoves();
    matchedPairs = 0;
    // Generate new board for selected level
    Gamelevel();
    showToastMessage(`Level changed to ${currentLevel}`);
  });
});

// ======================== INITIALIZATION ========================
// Generate default level board on page load
Gamelevel();
