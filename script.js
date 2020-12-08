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

const sixDeck = generateSixDeck();

shuffleDeck(sixDeck);

let userFunds = 1_000;

let option;
do {
  option = prompt(`User funds: ${userFunds}\n1. Place bet\n2. Cash out`);
  switch (option) {
    case '1':
      // TODO: allow user to place bet

      // TODO: start the game
      break;
    case '2':
      console.log(`You left the casino with ${userFunds}.`);
      break;
    default:
      console.log('Invalid option!');
  }
} while (option !== '2');
