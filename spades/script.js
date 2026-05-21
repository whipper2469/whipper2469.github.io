// ====================== ELITE SPADES ======================
let deck = [];
let players = [];
let currentPlayer = 0;
let currentTrick = [];
let leadSuit = null;
let scores = { us: 0, them: 0 };
let bids = [];
let tricksWon = [0,0,0,0];
let isPartnerMode = false;
let gameOver = false;

const suits = ['♠','♥','♦','♣'];
const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.value = ranks.indexOf(rank) + 2;
  }
  toString() { return this.suit + this.rank; }
}

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push(new Card(suit, rank));
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function deal() {
  createDeck();
  shuffle(deck);
  players = Array(4).fill().map(() => []);
  for (let i = 0; i < 52; i++) {
    players[i % 4].push(deck[i]);
  }
  // Sort hands
  players.forEach(hand => hand.sort((a,b) => a.value - b.value || suits.indexOf(a.suit) - suits.indexOf(b.suit)));
}

function renderHand() {
  const area = document.getElementById('hand-area');
  area.innerHTML = '';
  players[0].forEach((card, idx) => {
    const el = document.createElement('playing-card');
    el.setAttribute('suit', card.suit === '♠' ? 'spades' : card.suit === '♥' ? 'hearts' : card.suit === '♦' ? 'diamonds' : 'clubs');
    el.setAttribute('rank', card.rank);
    el.setAttribute('size', '80');
    el.className = 'playing-card cursor-pointer';
    el.onclick = () => playCard(idx);
    area.appendChild(el);
  });
}

function updateScores() {
  document.getElementById('score-us').textContent = scores.us;
  document.getElementById('score-them').textContent = scores.them;
}

function startGame(withPartner) {
  isPartnerMode = withPartner;
  document.getElementById('lobby').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  
  deal();
  renderHand();
  updateScores();
  document.getElementById('bidding-area').classList.remove('hidden');
  document.getElementById('status').textContent = "Your bid (0-13)";
}

function submitBid() {
  const bid = parseInt(document.getElementById('bid-input').value) || 0;
  bids[0] = bid;
  document.getElementById('bidding-area').classList.add('hidden');
  
  // AI bids
  for (let i = 1; i < 4; i++) {
    bids[i] = Math.max(2, Math.floor(Math.random()*6) + 3); // simple AI
  }
  
  document.getElementById('status').textContent = `Bids: You ${bid} | AI: ${bids.slice(1).join(', ')}`;
  setTimeout(startTrick, 1500);
}

function startTrick() {
  currentTrick = [];
  leadSuit = null;
  currentPlayer = 0; // You start first trick
  document.getElementById('status').textContent = "Your turn - Play a card";
}

function playCard(idx) {
  if (gameOver || currentPlayer !== 0) return;
  
  const card = players[0][idx];
  
  // Basic follow suit check
  if (leadSuit && card.suit !== leadSuit && players[0].some(c => c.suit === leadSuit)) {
    alert("Must follow suit!");
    return;
  }
  
  // Play it
  const played = players[0].splice(idx, 1)[0];
  currentTrick.push({player: 0, card: played});
  if (!leadSuit) leadSuit = played.suit;
  
  renderHand();
  renderTrickOnCanvas();
  
  currentPlayer = 1;
  setTimeout(aiPlay, 600);
}

function aiPlay() {
  while (currentPlayer < 4 && !gameOver) {
    const hand = players[currentPlayer];
    let playable = hand;
    
    if (leadSuit) {
      const canFollow = hand.filter(c => c.suit === leadSuit);
      if (canFollow.length) playable = canFollow;
    }
    
    // Simple AI: play lowest playable, or highest trump if winning
    playable.sort((a,b) => a.value - b.value);
    const chosen = playable[0];
    const idx = hand.indexOf(chosen);
    
    const card = hand.splice(idx, 1)[0];
    currentTrick.push({player: currentPlayer, card});
    
    renderTrickOnCanvas();
    currentPlayer++;
  }
  
  if (currentTrick.length === 4) {
    setTimeout(resolveTrick, 1200);
  }
}

function resolveTrick() {
  // Find winner
  let winnerIndex = 0;
  let winningCard = currentTrick[0].card;
  
  for (let i = 1; i < 4; i++) {
    const c = currentTrick[i].card;
    if (c.suit === winningCard.suit) {
      if (c.value > winningCard.value) {
        winningCard = c;
        winnerIndex = i;
      }
    } else if (c.suit === '♠' && winningCard.suit !== '♠') {
      winningCard = c;
      winnerIndex = i;
    }
  }
  
  tricksWon[winnerIndex]++;
  document.getElementById('status').textContent = `Trick won by Player ${winnerIndex}`;
  
  if (players[0].length === 0) {
    endRound();
  } else {
    currentPlayer = winnerIndex;
    currentTrick = [];
    leadSuit = null;
    setTimeout(() => {
      if (currentPlayer === 0) {
        document.getElementById('status').textContent = "Your turn";
      } else {
        aiPlay();
      }
    }, 800);
  }
}

function renderTrickOnCanvas() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Simple table + cards in center
  currentTrick.forEach((play, i) => {
    const x = 400 + (i * 80) - 120;
    const y = 250;
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, 70, 95);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, 70, 95);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(play.card.toString(), x+10, y+60);
  });
}

function endRound() {
  // Scoring (basic)
  let usTricks = tricksWon[0] + tricksWon[2]; // You + Partner
  let themTricks = tricksWon[1] + tricksWon[3];
  
  let usScore = bids[0] * 10;
  if (usTricks < bids[0]) usScore = -bids[0] * 10;
  else usScore += (usTricks - bids[0]); // overtricks
  
  let themScore = bids[1] * 10 + bids[3] * 10; // rough
  if (themTricks < bids[1] + bids[3]) themScore = - (bids[1] + bids[3]) * 10;
  
  scores.us += usScore;
  scores.them += themScore;
  
  updateScores();
  
  if (scores.us >= 500 || scores.them >= 500) {
    gameOver = true;
    alert(scores.us >= 500 ? "🎉 YOU WIN!" : "Opponents win.");
  } else {
    setTimeout(() => {
      alert(`Round over!\nYou: ${usTricks} tricks\nOpponents: ${themTricks}`);
      deal();
      renderHand();
      tricksWon = [0,0,0,0];
      bids = [];
      document.getElementById('bidding-area').classList.remove('hidden');
    }, 1000);
  }
}

function endGame() {
  if (confirm("End current game?")) {
    location.reload();
  }
}

// Tailwind script already included
