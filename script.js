'use strict';

const generateSixDeck = function () {
  const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  const values = [
    'Ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
  ];

  const sixDeck = [];

  for (let deck = 1; deck <= 6; deck++) {
    for (let suit = 0; suit < suits.length; suit++) {
      for (let value = 0; value < values.length; value++) {
        sixDeck.push({ suit: suits[suit], value: values[value] });
      }
    }
  }

  return sixDeck;
};

// Durstenfeld shuffle algorithm
const shuffleDeck = function (deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

const getFunds = function () {
  return new Intl.NumberFormat('en-US').format(funds);
};

const sixDeck = generateSixDeck();

shuffleDeck(sixDeck);

let funds = 1_000;

let option;
do {
  if (funds === 0) {
    alert('You have no remaining funds!');
    break;
  }

  option = prompt(`Funds: $${getFunds()}\n1. Place bet\n2. Cash out`);
  switch (option) {
    case '1':
      let bet = 0;
      do {
        bet = Number(prompt('Place your bet (-1 to exit): '));

        if (bet === -1) {
          break;
        } else if (bet < 0) {
          alert("Bets can't be negative!");
        } else if (bet === 0) {
          alert("Bet can't be 0!");
        } else {
          funds -= bet;
          break;
        }
      } while (bet <= 0 || bet > funds);

      console.log(`You placed a ${bet} dollar bet.`);

      // TODO: start the game
      break;
    case '2':
      console.log(`You left the casino with ${getFunds()} dollars.`);
      break;
    default:
      console.log('Invalid option!');
  }
} while (option !== '2');
