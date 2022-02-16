/* 
Hello! Welcome to my 100% JavaScript card game!

This game is a combination of both War and Speed.
The rules are simple:
1. Select a card from your hand to play by inputting a number that corresponds to the card you wish to play.
2. Highest card wins (aces are high).
3. If there is a tie, Black trumps Red.
4. If there is still a tie, Spades beat Clubs and Diamonds beat Hearts.
5. If 3 or more players tie, nobody wins.

Console commands:
  # - Plays the corresponding card from your hand
  clear - Clears the console
  cRound - Change the maximum round count (WIP)
  ctrl+c - Exits the program (you will receive a prompt)

You can change the total amount of rounds with the maxRound variable below OR by using the 'cRound' command during game-play.
Whichever player wins the most rounds, wins the game!

%Note that if you input something other than a number (or nothing at all), the game will automatically choose the first card in your hand%
*/

let maxRound = 21;

const cl = console.log;

// Allows the user to continuously type in console
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creates a new card object
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

// Gets suit color based on card suit
const getSuitColor = function (suit) {
  if (suit === "Hearts" || suit === "Diamonds") {
    return "Red";
  } else {
    return "Black";
  }
};

// Gets card name based on card value
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

// Calls newCard 14 for each suit, and pushes all to deck
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

// Pulls a random card from deck
const dealCard = function () {
  let i = Math.floor(Math.random() * deck.length);
  let card = deck.splice(i, 1)[0];
  return card;
};

// An object representing player hands
let players = {
  player: [],
  cpu1: [],
  cpu2: [],
  cpu3: [],
};

// Round-Robin dealing
for (let i = 0; i < 5; i++) {
  players.player.push(dealCard());
  players.cpu1.push(dealCard());
  players.cpu2.push(dealCard());
  players.cpu3.push(dealCard());
}

// Shows players hand and prompts them to select a card
console.clear();
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

// Default settings for variables
let roundCount = 1;
let playerWins = 0;
let cpu1Wins = 0;
let cpu2Wins = 0;
let cpu3Wins = 0;
let discardPile = [];

// Output depending on result of winner
let winType1 = function () {
  cl("\x1b[36m%s\x1b[3m", "Player has won this round!");
  return (playerWins += 1);
};
let winType2 = function () {
  cl("\x1b[33m%s\x1b[3m", "Cpu-1 has won this round!");
  return (cpu1Wins += 1);
};
let winType3 = function () {
  cl("\x1b[34m%s\x1b[3m", "Cpu-2 has won this round!");
  return (cpu2Wins += 1);
};
let winType4 = function () {
  cl("\x1b[35m%s\x1b[3m", "Cpu-3 has won this round!");
  return (cpu3Wins += 1);
};

// Determines the winner of the round
let winner = function (p1, p2, p3, p4) {
  if (
    p1[0].rank === p2[0].rank &&
    p1[0].rank === p3[0].rank &&
    p1[0].rank === p4[0].rank
  ) {
    cl("4-Way Tie! Nobody wins!");
    return;
  } else if (
    (p1[0].rank === p2[0].rank && p1[0].rank === p3[0].rank) ||
    (p1[0].rank === p2[0].rank && p1[0].rank === p4[0].rank) ||
    (p2[0].rank === p3[0].rank && p2[0].rank === p4[0].rank)
  ) {
    cl("3-Way Tie! Nobody wins!");
    return;
  } else if (
    p1[0].rank > p2[0].rank &&
    p1[0].rank > p3[0].rank &&
    p1[0].rank > p4[0].rank
  ) {
    winType1();
  } else if (
    p2[0].rank > p1[0].rank &&
    p2[0].rank > p3[0].rank &&
    p2[0].rank > p4[0].rank
  ) {
    winType2();
  } else if (
    p3[0].rank > p1[0].rank &&
    p3[0].rank > p2[0].rank &&
    p3[0].rank > p4[0].rank
  ) {
    winType3();
  } else if (
    p4[0].rank > p1[0].rank &&
    p4[0].rank > p2[0].rank &&
    p4[0].rank > p3[0].rank
  ) {
    winType4();
  } else if (p1[0].rank === p2[0].rank) {
    if (p1[0].color !== p2[0].color) {
      if (p1[0].color === "Black") {
        winType1();
      } else if (p2[0].color === "Black") {
        winType2();
      }
    } else {
      if (p1[0].suit === "Diamonds" || p1[0].suit === "Spades") {
        winType1();
      } else {
        winType2();
      }
    }
  } else if (p1[0].rank === p3[0].rank) {
    if (p1[0].color !== p3[0].color) {
      if (p1[0].color === "Black") {
        winType1();
      } else if (p3[0].color === "Black") {
        winType3();
      }
    } else {
      if (p1[0].suit === "Diamonds" || p1[0].suit === "Spades") {
        winType1();
      } else {
        winType3();
      }
    }
  } else if (p2[0].rank === p3[0].rank) {
    if (p2[0].color !== p3[0].color) {
      if (p2[0].color === "Black") {
        winType2();
      } else if (p3[0].color === "Black") {
        winType3();
      }
    } else {
      if (p2[0].suit === "Diamonds" || p2[0].suit === "Spades") {
        winType2();
      } else {
        winType3();
      }
    }
  } else if (p4[0].rank === p1[0].rank) {
    if (p4[0].color !== p1[0].color) {
      if (p4[0].color === "Black") {
        winType4();
      } else if (p1[0].color === "Black") {
        winType1();
      }
    } else {
      if (p4[0].suit === "Diamonds" || p4[0].suit === "Spades") {
        winType4();
      } else {
        winType1();
      }
    }
  } else if (p4[0].rank === p2[0].rank) {
    if (p4[0].color !== p2[0].color) {
      if (p4[0].color === "Black") {
        winType4();
      } else if (p2[0].color === "Black") {
        winType2();
      }
    } else {
      if (p4[0].suit === "Diamonds" || p4[0].suit === "Spades") {
        winType4();
      } else {
        winType2();
      }
    }
  } else if (p4[0].rank === p3[0].rank) {
    if (p4[0].color !== p3[0].color) {
      if (p4[0].color === "Black") {
        winType4();
      } else if (p3[0].color === "Black") {
        winType3();
      }
    } else {
      if (p4[0].suit === "Diamonds" || p4[0].suit === "Spades") {
        winType4();
      } else {
        winType3();
      }
    }
  }
};

// Runs after each user input.
let gameRound = function (input) {
  // Turns user input into a number (any non-number input is treated as a 1)
  let determine = parseInt(input, 10);
  /*
  1. If user input is a number greater than the hand size, an error will be displayed
  2. If the user inputs 'clear', the console clears
  */
  if (determine > players.player.length || determine < 1) {
    console.clear();
    cl("");
    cl(
      "\x1b[33m\x1b[3m",
      `Invalid number! Please enter a number between 1 and ${players.player.length}.`
    );
    cl("");
  } else if (input === "clear") {
    console.clear();
  } else {
    console.clear();
    // User selected card
    let choice = players.player.splice(determine - 1, 1);

    // Detects when deck is short on cards, then reshuffles all cards form the discard pile into deck
    // A card is then given to the user
    if (deck.length === 4) {
      for (let i = 0; i < 28; i++) {
        deck.push(discardPile[0]);
        discardPile.shift();
      }
      players.player.push(dealCard());
    } else {
      players.player.push(dealCard());
    }

    // Displays current round # and player card choice
    // Pauses readline
    cl("\x1b[1m", `Round: ${roundCount}`);
    cl("\x1b[1m", "--------------------------------------------------");
    cl("");
    cl("\x1b[36m%s\x1b[3m", "You played:");
    cl(`The ${choice[0].name} of ${choice[0].suit}. Value: ${choice[0].rank}`);
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");
    rl.pause();

    // Pushes user card choice to discard pile
    discardPile.push(choice[0]);

    // Cpu's played card
    let cpu1Play = players.cpu1.splice(
      Math.floor(Math.random() * players.cpu1.length),
      1
    );
    // Deals Cpu a new card
    if (deck.length !== 0) {
      players.cpu1.push(dealCard());
    }
    // Displays Cpu card choice
    cl("");
    cl("\x1b[33m%s\x1b[3m", "Cpu-1 played:");
    cl(
      `The ${cpu1Play[0].name} of ${cpu1Play[0].suit}. Value: ${cpu1Play[0].rank}`
    );
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");
    // Pushes Cpu card choice to discard pile
    discardPile.push(cpu1Play[0]);

    // Cpu's played card
    let cpu2Play = players.cpu2.splice(
      Math.floor(Math.random() * players.cpu2.length),
      1
    );
    // Deals Cpu a new card
    if (deck.length !== 0) {
      players.cpu2.push(dealCard());
    }
    // Displays Cpu card choice
    cl("");
    cl("\x1b[34m%s\x1b[3m", "Cpu-2 played:");
    cl(
      `The ${cpu2Play[0].name} of ${cpu2Play[0].suit}. Value: ${cpu2Play[0].rank}`
    );
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");
    // Pushes Cpu card choice to discard pile
    discardPile.push(cpu2Play[0]);

    // Cpu's played card
    let cpu3Play = players.cpu3.splice(
      Math.floor(Math.random() * players.cpu3.length),
      1
    );
    // Deals Cpu a new card
    if (deck.length !== 0) {
      players.cpu3.push(dealCard());
    }
    // Displays Cpu card choice
    cl("");
    cl("\x1b[35m%s\x1b[3m", "Cpu-3 played:");
    cl(
      `The ${cpu3Play[0].name} of ${cpu3Play[0].suit}. Value: ${cpu3Play[0].rank}`
    );
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");
    cl("");
    // Displays round winner and increases round count
    winner(choice, cpu1Play, cpu2Play, cpu3Play);
    roundCount += 1;
    cl("");
    cl("\x1b[1m", "--------------------------------------------------");
    // Pushes Cpu card choice to discard pile
    discardPile.push(cpu3Play[0]);
  }

  /* 
  1. Detects when max round has been reached and ends game
  2. If the user inputs 'cRound', a prompt is displayed asking whether they'd like to increase or decrease or neither
  3. If the user inputs 'wins', a prompt appears asking for a player, then that players total round wins are displayed
  */
  if (roundCount === maxRound + 1) {
    cl("");
    cl("\x1b[0m\x1b[1m", "--------------------------------------------------");
    cl("");
    cl("\x1b[0m\x1b[1m", "The game is over!");
    cl("");
    cl(finalScore(playerWins, cpu1Wins, cpu2Wins, cpu3Wins));
    cl("");
    cl("\x1b[0m\x1b[1m", "--------------------------------------------------");
    cl("");
    rl.close();
  } else if (input === "cRound") {
    console.clear();
    rl.question(
      "Would you like to change the number of rounds (y, n)?",
      (ans) => {
        if (ans.match(/^y(es)?$/i)) {
          rl.question(
            "Would you like to increase or reduce the total rounds (in, re)?",
            (ans) => {
              if (ans === "in") {
                rl.question("How many rounds would you like to add?", (ans) => {
                  let newR = parseInt(ans, 10);
                  maxRound += newR;
                  console.clear();
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
                });
              } else if (ans === "re") {
                rl.question(
                  "How many rounds would you like to subtract?",
                  (ans) => {
                    let newR = parseInt(ans, 10);
                    maxRound -= newR;
                    console.clear();
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
                );
              } else {
                console.clear();
                cl("Invalid Response");
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
            }
          );
        } else {
          console.clear();
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
      }
    );
  } else if (input === "wins") {
    console.clear();
    rl.question(
      "Which player's wins would you like to check (play, cp1, cp2, cp3)?",
      (ans) => {
        if (ans === "play") {
          console.clear();
          cl(`This player has won ${playerWins} round(s)`);
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
        } else if (ans === "cp1") {
          console.clear();
          cl(`This player has won ${cpu1Wins} round(s)`);
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
        } else if (ans === "cp2") {
          console.clear();
          cl(`This player has won ${cpu2Wins} round(s)`);
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
        } else if (ans === "cp3") {
          console.clear();
          cl(`This player has won ${cpu3Wins} round(s)`);
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
        } else {
          cl("Invalid response");
        }
      }
    );
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
// Compares all player's total wins and determines a final winner
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

// Prompts user when ctrl+c is pressed
rl.on("SIGINT", () => {
  rl.question("\x1b[1m\x1b[0m Exit (y or n)? ", (input) => {
    if (input.match(/^y(es)?$/i)) {
      // Shows final win count
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
