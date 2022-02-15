const cl = console.log;
const ct = console.table;

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newCard = function (suit, rank) {
  let name = getRankName(rank);
  let color = getSuitColor(suit);
  let card = {
    suit: suit,
    rank: rank,
    name: name,
    color: color,
  };
  return card;
};

const getSuitColor = function (suit) {
  if (suit === "Hearts" || suit === "Diamonds") {
    return "Red";
  } else {
    return "Black";
  }
};

const getRankName = function (rank) {
  switch (rank) {
    case 11:
      return "Jack";
    case 12:
      return "Queen";
    case 13:
      return "King";
    case 14:
      return "Ace";
    default:
      return rank.toString();
  }
};

const buildDeck = function () {
  let deck = [];
  for (let rank = 2; rank < 15; rank++) {
    deck.push(newCard("Hearts", rank));
    deck.push(newCard("Diamonds", rank));
    deck.push(newCard("Spades", rank));
    deck.push(newCard("Clubs", rank));
  }
  return deck;
};

let deck = buildDeck();

const dealCard = function () {
  let i = Math.floor(Math.random() * deck.length);
  let card = deck.splice(i, 1)[0];
  return card;
};

let players = {
  player: [],
  cpu1: [],
  cpu2: [],
};

for (let i = 0; i < 7; i++) {
  players.player.push(dealCard());
  players.cpu1.push(dealCard());
  players.cpu2.push(dealCard());
}

cl("Your hand:");
ct(players.player);

rl.setPrompt(`Please select a card to play. `);
rl.prompt();
rl.on("line", (selection) => {
  gameRound(selection);
});

let playerWins = 0;
let cpu1Wins = 0;
let cpu2Wins = 0;

let winner = function (p1, p2, p3) {
  if (p1[0].rank !== p2[0].rank && p2[0].rank !== p3[0].rank) {
    if (p1[0].rank > p2[0].rank && p1[0].rank > p3[0].rank) {
      cl("Player has won this round!");
      return (playerWins += 1);
    } else if (p2[0].rank > p1[0].rank && p2[0].rank > p3[0].rank) {
      cl("Cpu-1 has won this round!");
      return (cpu1Wins += 1);
    } else {
      cl("Cpu-2 has won this round!");
      return (cpu2Wins += 1);
    }
  } else {
    switch ((p1, p2, p3)) {
      case p1[0].color === "Black" &&
        p2[0].color === "Red" &&
        p3[0].color === "Red":
        cl("Player has won this round!");
        return (playerWins += 1);

      case p2[0].color === "Black" &&
        p1[0].color === "Red" &&
        p3[0].color === "Red":
        cl("Cpu-1 has won this round!");
        return (cpu1Wins += 1);

      case p3[0].color === "Black" &&
        p2[0].color === "Red" &&
        p1[0].color === "Red":
        cl("Cpu-2 has won this round!");
        return (cpu2Wins += 1);

      case p1[0].suit === "Spades":
        cl("Player has won this round!");
        return (playerWins += 1);

      case p2[0].suit === "Spades":
        cl("Cpu-1 has won this round!");
        return (cpu1Wins += 1);

      case p3[0].suit === "Spades":
        cl("Cpu-2 has won this round!");
        return (cpu2Wins += 1);

      case p1[0].suit === "Diamonds":
        cl("Player has won this round!");
        return (playerWins += 1);

      case p2[0].suit === "Diamonds":
        cl("Cpu-1 has won this round!");
        return (cpu1Wins += 1);

      case p3[0].suit === "Diamonds":
        cl("Cpu-2 has won this round!");
        return (cpu2Wins += 1);
    }
  }
};

let gameRound = function (number) {
  let determine = parseInt(number, 10);
  let choice = players.player.splice(determine - 1, 1);
  players.player.push(dealCard());
  cl("--------------------------------------------------");
  cl("You played:");
  ct(choice);
  cl("--------------------------------------------------");
  rl.pause();

  let cpu1Play = players.cpu1.splice(
    Math.floor(Math.random() * players.cpu1.length),
    1
  );
  cl("Cpu-1 played:");
  ct(cpu1Play);
  cl("--------------------------------------------------");

  let cpu2Play = players.cpu2.splice(
    Math.floor(Math.random() * players.cpu2.length),
    1
  );
  cl("Cpu-2 played:");
  ct(cpu2Play);
  cl("--------------------------------------------------");

  winner(choice, cpu1Play, cpu2Play);

  cl("--------------------------------------------------");
  // cl(playerWins);
  // cl(cpu1Wins);
  // cl(cpu2Wins);

  cl("Your hand:");
  ct(players.player);
  rl.resume();
};

rl.on("SIGINT", () => {
  rl.question("Exit (y or n)? ", (input) => {
    if (input.match(/^y(es)?$/i)) {
      rl.pause();
    }
  });
});
