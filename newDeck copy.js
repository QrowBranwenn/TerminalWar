/* 
  Hello! Welcome to my 100% JavaScript card game!

  The rules are simple:
    1. Select a card from your hand to play by inputting a number (1-5) that corresponds to the ard you wish to play.
    2. Highest card wins.
    3. If there is a tie, Black trumps Red.
    4. If there is still a tie, Spades beat Clubs and Diamonds beat Hearts.
    5. Finally, there are 13 rounds in total. However, if you wish to end the game early, simply press control+c. (You will still receive a winner).
   
  Whichever player wins the most rounds, wins the game!

  *Note that if you input something other than a number (or nothing at all), the game will automatically choose the first card in your hand.
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
  cpu3: [],
};

for (let i = 0; i < 5; i++) {
  players.player.push(dealCard());
  players.cpu1.push(dealCard());
  players.cpu2.push(dealCard());
  players.cpu3.push(dealCard());
}

cl("");
cl("\x1b[3m", "Your hand:");
cl("");
for (let i = 1; i < players.player.length + 1; i++) {
  cl(
    `${i}) ${players.player[i - 1].name} of ${
      players.player[i - 1].suit
    }. Value: ${players.player[i - 1].rank}`
  );
}
cl("");

rl.setPrompt("Please select a card to play.");
rl.prompt();
rl.on("line", (selection) => {
  gameRound(selection);
});

let playerWins = 0;
let cpu1Wins = 0;
let cpu2Wins = 0;
let cpu3Wins = 0;
let roundCount = 1;

let winner = function (p1, p2, p3, p4) {
  if (
    p1[0].rank > p2[0].rank &&
    p1[0].rank > p3[0].rank &&
    p1[0].rank > p4[0].rank
  ) {
    cl("\x1b[36m%s\x1b[3m", "Player has won this round!");
    return (playerWins += 1);
  } else if (
    p2[0].rank > p1[0].rank &&
    p2[0].rank > p3[0].rank &&
    p2[0].rank > p4[0].rank
  ) {
    cl("\x1b[33m%s\x1b[3m", "Cpu-1 has won this round!");
    return (cpu1Wins += 1);
  } else if (
    p3[0].rank > p1[0].rank &&
    p3[0].rank > p2[0].rank &&
    p3[0].rank > p4[0].rank
  ) {
    cl("\x1b[34m%s\x1b[3m", "Cpu-2 has won this round!");
    return (cpu2Wins += 1);
  } else if (
    p4[0].rank > p1[0].rank &&
    p4[0].rank > p2[0].rank &&
    p4[0].rank > p3[0].rank
  ) {
    cl("\x1b[35m%s\x1b[3m", "Cpu-3 has won this round!");
    return (cpu3Wins += 1);
  } else if (p1[0].rank === p2[0].rank) {
    if (p1[0].color !== p2[0].color) {
      if (p1[0].color === "Black") {
        cl("\x1b[36m%s\x1b[3m", "Player has won this round!");
        return (playerWins += 1);
      } else if (p2[0].color === "Black") {
        cl("\x1b[33m%s\x1b[3m", "Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      }
    } else {
      if (p1[0].suit === "Diamonds" || p1[0].suit === "Spades") {
        cl("\x1b[36m%s\x1b[3m", "Player has won this round!");
        return (playerWins += 1);
      } else {
        cl("\x1b[33m%s\x1b[3m", "Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      }
    }
  } else if (p1[0].rank === p3[0].rank) {
    if (p1[0].color !== p3[0].color) {
      if (p1[0].color === "Black") {
        cl("\x1b[36m%s\x1b[3m", "Player has won this round!");
        return (playerWins += 1);
      } else if (p3[0].color === "Black") {
        cl("\x1b[34m%s\x1b[3m", "Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    } else {
      if (p1[0].suit === "Diamonds" || p1[0].suit === "Spades") {
        cl("\x1b[36m%s\x1b[3m", "Player has won this round!");
        return (playerWins += 1);
      } else {
        cl("\x1b[34m%s\x1b[3m", "Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    }
  } else if (p2[0].rank === p3[0].rank) {
    if (p2[0].color !== p3[0].color) {
      if (p2[0].color === "Black") {
        cl("\x1b[33m%s\x1b[3m", "Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      } else if (p3[0].color === "Black") {
        cl("\x1b[34m%s\x1b[3m", "Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    } else {
      if (p2[0].suit === "Diamonds" || p2[0].suit === "Spades") {
        cl("\x1b[33m%s\x1b[3m", "Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      } else {
        cl("\x1b[34m%s\x1b[3m", "Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    }
  } else if (p4[0].rank === p1[0].rank) {
    if (p4[0].color !== p1[0].color) {
      if (p4[0].color === "Black") {
        cl("\x1b[35m%s\x1b[3m", "Cpu-3 has won this round!");
        return (cpu3Wins += 1);
      } else if (p1[0].color === "Black") {
        cl("\x1b[36m%s\x1b[3m", "Player has won this round!");
        return (playerWins += 1);
      }
    } else {
      if (p4[0].suit === "Diamonds" || p4[0].suit === "Spades") {
        cl("\x1b[35m%s\x1b[3m", "Cpu-3 has won this round!");
        return (cpu3Wins += 1);
      } else {
        cl("\x1b[36m%s\x1b[3m", "Player has won this round!");
        return (playerWins += 1);
      }
    }
  } else if (p4[0].rank === p2[0].rank) {
    if (p4[0].color !== p2[0].color) {
      if (p4[0].color === "Black") {
        cl("\x1b[35m%s\x1b[3m", "Cpu-3 has won this round!");
        return (cpu3Wins += 1);
      } else if (p2[0].color === "Black") {
        cl("\x1b[33m%s\x1b[3m", "Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      }
    } else {
      if (p4[0].suit === "Diamonds" || p4[0].suit === "Spades") {
        cl("\x1b[35m%s\x1b[3m", "Cpu-3 has won this round!");
        return (cpu3Wins += 1);
      } else {
        cl("\x1b[33m%s\x1b[3m", "Cpu-1 has won this round!");
        return (cpu1Wins += 1);
      }
    }
  } else if (p4[0].rank === p3[0].rank) {
    if (p4[0].color !== p3[0].color) {
      if (p4[0].color === "Black") {
        cl("\x1b[35m%s\x1b[3m", "Cpu-3 has won this round!");
        return (cpu3Wins += 1);
      } else if (p3[0].color === "Black") {
        cl("\x1b[34m%s\x1b[3m", "Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    } else {
      if (p4[0].suit === "Diamonds" || p4[0].suit === "Spades") {
        cl("\x1b[35m%s\x1b[3m", "Cpu-3 has won this round!");
        return (cpu3Wins += 1);
      } else {
        cl("\x1b[34m%s\x1b[3m", "Cpu-2 has won this round!");
        return (cpu2Wins += 1);
      }
    }
  }
};
let gameRound = function (number) {
  let determine = parseInt(number, 10);
  if (determine > players.player.length || determine < 1) {
    cl("");
    cl(
      "\x1b[33m\x1b[3m",
      `Invalid number! Please enter a number between 1 and ${players.player.length}.`
    );
    cl("");
  } else {
    console.clear();
    let choice = players.player.splice(determine - 1, 1);
    if (deck.length !== 0) {
      players.player.push(dealCard());
    }
    cl("\x1b[1m", `Round: ${roundCount}`);
    cl("\x1b[1m", "--------------------------------------------------");
    cl("");
    cl("\x1b[36m%s\x1b[3m", "You played:");
    cl(`The ${choice[0].name} of ${choice[0].suit}. Value: ${choice[0].rank}`);
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");
    rl.pause();

    let cpu1Play = players.cpu1.splice(
      Math.floor(Math.random() * players.cpu1.length),
      1
    );
    if (deck.length !== 0) {
      players.cpu1.push(dealCard());
    }
    cl("");
    cl("\x1b[33m%s\x1b[3m", "Cpu-1 played:");
    cl(
      `The ${cpu1Play[0].name} of ${cpu1Play[0].suit}. Value: ${cpu1Play[0].rank}`
    );
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");

    let cpu2Play = players.cpu2.splice(
      Math.floor(Math.random() * players.cpu2.length),
      1
    );
    if (deck.length !== 0) {
      players.cpu2.push(dealCard());
    }
    cl("");
    cl("\x1b[34m%s\x1b[3m", "Cpu-2 played:");
    cl(
      `The ${cpu2Play[0].name} of ${cpu2Play[0].suit}. Value: ${cpu2Play[0].rank}`
    );
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");

    let cpu3Play = players.cpu3.splice(
      Math.floor(Math.random() * players.cpu3.length),
      1
    );
    if (deck.length !== 0) {
      players.cpu3.push(dealCard());
    }
    cl("");
    cl("\x1b[35m%s\x1b[3m", "Cpu-3 played:");
    cl(
      `The ${cpu3Play[0].name} of ${cpu3Play[0].suit}. Value: ${cpu3Play[0].rank}`
    );
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");
    cl("");
    winner(choice, cpu1Play, cpu2Play, cpu3Play);
    roundCount += 1;
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");
  }
  if (
    players.player.length === 0 ||
    players.cpu1.length === 0 ||
    players.cpu2.length === 0 ||
    players.cpu3.length === 0
  ) {
    cl("");
    cl("\x1b[0m\x1b[1m", "--------------------------------------------------");
    cl("");
    cl(
      "\x1b[0m\x1b[1m",
      "The game is over as all players have run out of cards!"
    );
    cl("");
    cl(finalScore(playerWins, cpu1Wins, cpu2Wins, cpu3Wins));
    cl("");
    cl("\x1b[0m\x1b[1m", "--------------------------------------------------");
    cl("");
    rl.close();
  } else {
    cl("");
    cl("\x1b[1m\x1b[0m", "Your hand:");
    cl("");
    for (let i = 1; i < players.player.length + 1; i++) {
      cl(
        `${i}) ${players.player[i - 1].name} of ${
          players.player[i - 1].suit
        }. Value: ${players.player[i - 1].rank}`
      );
    }
    cl("");
    rl.prompt();
    rl.resume();
  }
};

let finalScore = function (p1, p2, p3, p4) {
  if (p1 > p2 && p1 > p3 && p1 > p4) {
    return "\x1b[1m", `Player has the most wins with ${p1} in total!`;
  } else if (p2 > p1 && p2 > p3 && p2 > p4) {
    return "\x1b[1m", `Cpu-1 has the most wins with ${p2} in total!`;
  } else if (p3 > p1 && p3 > p2 && p3 > p4) {
    return "\x1b[1m", `Cpu-2 has the most wins with ${p3} in total!`;
  } else if (p4 > p1 && p4 > p2 && p4 > p3) {
    return "\x1b[1m", `Cpu-3 has the most wins with ${p4} in total!`;
  } else {
    if (p1 === 0) {
      return "\x1b[1m", `No one's a winner!`;
    } else if (p1 === p3) {
      return "\x1b[1m", `Player and Cpu-2 have tied with ${p1} wins each!`;
    } else if (p2 === p3) {
      return "\x1b[1m", `Both Cpu-1 and Cpu-2 have tied with ${p2} wins each!`;
    } else if (p1 === p4) {
      return "\x1b[1m", `Player and Cpu-3 have tied with ${p1} wins each!`;
    } else if (p2 === p4) {
      return "\x1b[1m", `Both Cpu-1 and Cpu-3 have tied with ${p2} wins each!`;
    } else if (p3 === p4) {
      return "\x1b[1m", `Both Cpu-2 and Cpu-3 have tied with ${p3} wins each!`;
    } else if (p1 === p2) {
      return "\x1b[1m", `Player and Cpu-1 have tied with ${p1} wins each!`;
    } else {
      return "\x1b[1m", `Somehow, all players tied!`;
    }
  }
};

rl.on("SIGINT", () => {
  rl.question("\x1b[1m\x1b[0m Exit (y or n)? ", (input) => {
    if (input.match(/^y(es)?$/i)) {
      cl("");
      cl(
        "\x1b[1m\x1b[0m",
        "--------------------------------------------------"
      );
      cl("");
      cl(
        "\x1b[1m\x1b[0m",
        `Game aborted early. ${finalScore(
          playerWins,
          cpu1Wins,
          cpu2Wins,
          cpu3Wins
        )}`
      );
      cl("");
      cl(
        "\x1b[1m\x1b[0m",
        "--------------------------------------------------"
      );
      cl("");
      rl.pause();
    }
  });
});
