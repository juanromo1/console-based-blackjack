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

const usdNumberFormatter = function (number) {
  return `$${new Intl.NumberFormat('en-US').format(number)}`;
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

  option = prompt(
    `Funds: ${usdNumberFormatter(funds)}\n1. Place bet\n2. Cash out`
  );
  switch (option) {
    case '1':
      let bet = 0;
      do {
        bet = Number(
          prompt(
            `Funds: ${usdNumberFormatter(funds)}\nPlace your bet (-1 to exit): `
          )
        );

        if (isNaN(bet)) {
          alert('Bet must be a number!');
        } else if (bet === -1) {
          break;
        } else if (bet < 0) {
          alert("Bet can't be negative!");
        } else if (bet === 0) {
          alert("Bet can't be 0!");
        } else if (bet > funds) {
          alert("Bet can't exceed available funds!");
        } else {
          console.log(`You placed a ${usdNumberFormatter(bet)} bet.`);
          funds -= bet;
          break;
        }
        console.log(`You placed a ${usdNumberFormatter(bet)} bet.`);
      } while (isNaN(bet) || bet <= 0 || bet > funds);

      // TODO: start the game
      break;
    case '2':
      console.log(`You left the casino with ${usdNumberFormatter(funds)}.`);
      break;
    default:
      alert('Invalid option!');
  }
} while (option !== '2');
