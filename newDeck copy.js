/* 
  Hello! Welcome to my 100% JavaScript card game!

  The rules are simple:
    1. Select a card from your hand to play by inputting a number (1-7) that corresponds to the ard you wish to play.
    2. Highest card wins.
    3. If there is a tie, Black trumps Red.
    4. If there is still a tie, Spades beat Clubs and Diamonds beat Hearts.
    5. Finally, if you wish to end the game early, simply press control+c. (You will still receive a winner).
   
  Whichever player wins the most rounds, wins the game!

  *Note that if you input something other than a number 1-7 (or nothing at all), the game will automatically choose the first card in your hand.
*/

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
  if (p1[0].rank > p2[0].rank && p1[0].rank > p3[0].rank) {
    cl("Player has won this round!");
    return (playerWins += 1);
  } else if (p2[0].rank > p1[0].rank && p2[0].rank > p3[0].rank) {
    cl("Cpu-1 has won this round!");
    return (cpu1Wins += 1);
  } else if (p3[0].rank > p1[0].rank && p3[0].rank > p2[0].rank) {
    cl("Cpu-2 has won this round!");
    return (cpu2Wins += 1);
  } else if (p1[0].rank === p2[0].rank) {
    if (p1[0].color !== p2[0].color) {
      if (p1[0].color === "Black") {
        cl("Player has won this round!");
        return (playerWins += 1);
      } else if (p2[0].color === "Black") {
        cl("Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      }
    } else {
      if (p1[0].suit === "Diamonds" || p1[0].suit === "Spades") {
        cl("Player has won this round!");
        return (playerWins += 1);
      } else {
        cl("Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      }
    }
  } else if (p1[0].rank === p3[0].rank) {
    if (p1[0].color !== p3[0].color) {
      if (p1[0].color === "Black") {
        cl("Player has won this round!");
        return (playerWins += 1);
      } else if (p3[0].color === "Black") {
        cl("Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    } else {
      if (p1[0].suit === "Diamonds" || p1[0].suit === "Spades") {
        cl("Player has won this round!");
        return (playerWins += 1);
      } else {
        cl("Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    }
  } else if (p2[0].rank === p3[0].rank) {
    if (p2[0].color !== p3[0].color) {
      if (p2[0].color === "Black") {
        cl("Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      } else if (p3[0].color === "Black") {
        cl("Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    } else {
      if (p2[0].suit === "Diamonds" || p2[0].suit === "Spades") {
        cl("Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      } else {
        cl("Cpu-1 has won this round!");
        return (cpu2Wins += 1);
      }
    }
  }
};

let gameRound = function (number) {
  let determine = parseInt(number, 10);
  if (determine > 7 || determine < 1) {
    cl("Invalid number! Please enter a number between 1 and 7.");
  } else {
    let choice = players.player.splice(determine - 1, 1);
    if (deck.length !== 0) {
      players.player.push(dealCard());
    }
    cl("--------------------------------------------------");
    cl("You played:");
    ct(choice);
    cl("--------------------------------------------------");
    rl.pause();

    let cpu1Play = players.cpu1.splice(
      Math.floor(Math.random() * players.cpu1.length),
      1
    );
    if (deck.length !== 0) {
      players.cpu1.push(dealCard());
    }
    cl("Cpu-1 played:");
    ct(cpu1Play);
    cl("--------------------------------------------------");

    let cpu2Play = players.cpu2.splice(
      Math.floor(Math.random() * players.cpu2.length),
      1
    );
    if (deck.length !== 0) {
      players.cpu2.push(dealCard());
    }
    cl("Cpu-2 played:");
    ct(cpu2Play);
    cl("--------------------------------------------------");

    winner(choice, cpu1Play, cpu2Play);

    cl("--------------------------------------------------");
    cl("Your hand:");
    ct(players.player);
  }
  if (players.cpu1.length === 0) {
    cl("The game is over as 1 or more players have run out of cards!");
    cl(finalScore(playerWins, cpu1Wins, cpu2Wins));
    rl.close();
  } else {
    rl.resume();
  }
};

let finalScore = function (p1, p2, p3) {
  if (p1 > p2 && p1 > p3) {
    return `Player has the most wins with ${p1} in total!`;
  } else if (p2 > p1 && p2 > p3) {
    return `Cpu-1 has the most wins with ${p2} in total!`;
  } else if (p3 > p1 && p3 > p2) {
    return `Cpu-2 has the most wins with ${p3} in total!`;
  } else {
    if (p1 === p2) {
      return `Player and Cpu-1 have tied with ${p1} wins each!`;
    } else if (p1 === p3) {
      return `Player and Cpu-2 have tied with ${p1} wins each!`;
    } else if (p2 === p3) {
      return `Both Cpu-1 and Cpu-2 have tied with ${p2} wins each!`;
    } else {
      return `All players have tied with ${p1} wins each!`;
    }
  }
};

rl.on("SIGINT", () => {
  rl.question("Exit (y or n)? ", (input) => {
    if (input.match(/^y(es)?$/i)) {
      cl(`Game aborted early. ${finalScore(playerWins, cpu1Wins, cpu2Wins)}`);
      rl.pause();
    }
  });
});
