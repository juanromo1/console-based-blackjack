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

const startGame = function (bet) {
  const userHand = [];
  let userHandValue = 0;
  const dealerHand = [];
  let dealerHandValue = 0;

  // Deal cards
  userHand.push(sixDeck.pop());
  dealerHand.push(sixDeck.pop());
  userHand.push(sixDeck.pop());
  dealerHand.push(sixDeck.pop());

  const USERS_TURN_MSG = '*'.repeat(12) + ' Your turn ' + '*'.repeat(12);
  const DEALERS_TURN_MSG = '*'.repeat(10) + " Dealer's turn " + '*'.repeat(10);
  const BLACKJACK_MSG = 'Blackjack!';
  const PUSH_MSG = 'Push!';
  const LINE_SEPERATOR = '*'.repeat(35);

  const BLACKJACK_WINNINGS = bet * 1.5;

  console.log(USERS_TURN_MSG);
  userHandValue = calculateHandValue(userHand);
  console.log(
    `Your cards: ${userHand[0].value} of ${userHand[0].suit} and ${userHand[1].value} of ${userHand[1].suit}\nYour hand value: ${userHandValue}`
  );

  dealerHandValue = calculateHandValue(dealerHand);
  // Only show the dealer's first card
  const dealersFirstCardValue = calculateHandValue([dealerHand[0]]);
  console.log(
    `Dealer card: ${dealerHand[0].value} of ${dealerHand[0].suit}\nDealer hand value: ${dealersFirstCardValue}`
  );

  const DEALER_STARTING_HAND_MSG = `Dealer cards: ${dealerHand[0].value} of ${dealerHand[0].suit} and ${dealerHand[1].value} of ${dealerHand[1].suit}\nDealer hand value: ${dealerHandValue}`;

  const winningsMsg = winnings => {
    console.log(`You won ${usdNumberFormatter(winnings)}!`);
  };

  // User blackjack
  if (userHandValue === 21) {
    console.log(BLACKJACK_MSG);
    console.log(DEALERS_TURN_MSG);
    console.log(DEALER_STARTING_HAND_MSG);
    if (dealerHandValue === 21) {
      console.log(PUSH_MSG);
      console.log(LINE_SEPERATOR);
      return bet;
    } else {
      winningsMsg(BLACKJACK_WINNINGS);
      console.log(LINE_SEPERATOR);
      return BLACKJACK_WINNINGS;
    }
  }

  // User's turn
  let option;
  do {
    option = prompt(
      `Dealer Score: ${dealersFirstCardValue}\nYour Score: ${userHandValue}\n1. Hit\n2. Hold`
    );

    if (option === '1') {
      const drawnCard = sixDeck.pop();
      userHand.push(drawnCard);
      console.log(`You drew ${drawnCard.value} of ${drawnCard.suit}`);

      userHandValue = calculateHandValue(userHand);
      console.log(`Your hand value: ${userHandValue}`);

      if (userHandValue > 21) {
        console.log('You bust!');
        return 0;
      } else if (userHandValue === 21) {
        // Don't allow user to hit once at 21
        break;
      }
    }
  } while (option !== '2');

  console.log(DEALERS_TURN_MSG);
  console.log(DEALER_STARTING_HAND_MSG);

  // Dealer's turn
  while (dealerHandValue < 17) {
    const drawnCard = sixDeck.pop();
    dealerHand.push(drawnCard);
    console.log(`Dealer drew ${drawnCard.value} of ${drawnCard.suit}`);

    dealerHandValue = calculateHandValue(dealerHand);
    console.log(`Dealer hand value: ${dealerHandValue}`);

    if (dealerHandValue > 21) {
      console.log('Dealer bust!');
      winningsMsg(bet * 2);
      console.log(LINE_SEPERATOR);
      return bet * 2;
    }
  }

  if (userHandValue > dealerHandValue) {
    winningsMsg(bet * 2);
    console.log(LINE_SEPERATOR);
    return bet * 2;
  } else if (userHandValue < dealerHandValue) {
    console.log(`You lost ${usdNumberFormatter(bet)}!`);
    console.log(LINE_SEPERATOR);
    return 0;
  } else {
    console.log(PUSH_MSG);
    console.log(LINE_SEPERATOR);
    return bet;
  }
};

const calculateHandValue = function (hand) {
  // Move aces to the end of the array to properly handle soft/hard hands
  const compareCards = function (card1, card2) {
    if (card1.value === 'Ace') {
      return 1;
    } else if (card2.value === 'Ace') {
      return -1;
    } else {
      return 0;
    }
  };
  hand.sort(compareCards);

  let handValue = 0;
  for (let i = 0; i < hand.length; i++) {
    const cardValue = hand[i].value;
    switch (cardValue) {
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '10':
        handValue += Number(cardValue);
        break;
      case 'Jack':
      case 'Queen':
      case 'King':
        handValue += 10;
        break;
      case 'Ace':
        handValue + 11 > 21 ? (handValue += 1) : (handValue += 11);
        break;
    }
  }
  return handValue;
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
          funds -= bet;
          console.log(`You placed a ${usdNumberFormatter(bet)} bet.`);
          funds += startGame(bet);
          break;
        }
        console.log(`You placed a ${usdNumberFormatter(bet)} bet.`);
      } while (isNaN(bet) || bet <= 0 || bet > funds);
      break;
    case '2':
      console.log(`You left the casino with ${usdNumberFormatter(funds)}.`);
      break;
    default:
      alert('Invalid option!');
  }
} while (option !== '2');
