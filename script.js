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

const sixDeck = generateSixDeck();

console.log(sixDeck);

// TODO: shuffle cards
