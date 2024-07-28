const suits = ["♠", "♥", "♦", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export function createDeck() {
  return suits.flatMap((suit) => values.map((value) => ({ suit, value })));
}

export function shuffleDeck(deck) {
  return [...deck].sort(() => Math.random() - 0.5);
}

export function calculateHandValue(hand) {
  let value = 0;
  let aceCount = 0;

  for (const card of hand) {
    if (card.value === "A") {
      aceCount++;
      value += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      value += 10;
    } else {
      value += parseInt(card.value);
    }
  }

  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount--;
  }

  return value;
}

export function initializeGame() {
  const deck = shuffleDeck(createDeck());
  const playerHand = [deck.pop(), deck.pop()];
  const dealerHand = [deck.pop(), deck.pop()];

  return {
    deck,
    playerHand,
    dealerHand,
    gameOver: false,
    message: "",
  };
}

export function hit(gameState) {
  if (gameState.gameOver) return gameState;

  const newState = { ...gameState };
  newState.playerHand.push(newState.deck.pop());

  if (calculateHandValue(newState.playerHand) > 21) {
    newState.gameOver = true;
    newState.message = "Bust! You lose.";
  }

  return newState;
}

export function stand(gameState) {
  if (gameState.gameOver) return gameState;

  const newState = { ...gameState };

  while (calculateHandValue(newState.dealerHand) < 17) {
    newState.dealerHand.push(newState.deck.pop());
  }

  const playerValue = calculateHandValue(newState.playerHand);
  const dealerValue = calculateHandValue(newState.dealerHand);

  newState.gameOver = true;

  if (dealerValue > 21 || playerValue > dealerValue) {
    newState.message = "You win!";
  } else if (playerValue < dealerValue) {
    newState.message = "Dealer wins!";
  } else {
    newState.message = "It's a tie!";
  }

  return newState;
}
