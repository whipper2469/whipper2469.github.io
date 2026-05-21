// Card representation
class Card {
  constructor(suit, rank) {
    this.suit = suit; // '♠','♥','♦','♣'
    this.rank = rank; // 2-14 (A=14)
    this.img = `assets/cards/${suit}${rank}.svg`; // or PNG
  }
}

// Deck
let deck = [];
function createDeck() {
  deck = [];
  const suits = ['♠','♥','♦','♣'];
  for (let s of suits) {
    for (let r = 2; r <= 14; r++) {
      deck.push(new Card(s, r));
    }
  }
}

// Shuffle with visual animation (Fisher-Yates + canvas particles)
function shuffle(deck) {
  // ... Fisher-Yates
  playSound('shuffle');
  animateShuffleOnCanvas();
}

// Game State
let players = [{name: "You", hand: [], team: 1, tricks: 0, bid: 0},
               {name: "AI North", hand: [], team: 2, ...},
               ...];

let currentTrick = [];
let trumpBroken = false;

// Bidding, Play, Scoring (standard Spades rules)
function startBidding() { /* sequential bids, nil option optional */ }
function playCard(cardIndex) { /* follow suit, trump logic, winner determination */ }

// Smart AI (better than most free games)
function aiBid(hand) {
  // Count high cards, suits, spades
  let spades = hand.filter(c => c.suit === '♠').length;
  let highCards = hand.filter(c => c.rank >= 10).length;
  return Math.max(3, Math.floor(highCards * 0.7 + spades * 0.4)); // tunable
}

function aiPlay(hand, trick, leadSuit) {
  // Priority: follow suit if possible
  // Win if safe, otherwise throw low
  // Advanced: basic Monte-Carlo sampling for endgame (future)
  // Use heuristics from research (MCTS-lite possible)
}
