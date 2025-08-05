import Dealer from './Dealer.js';

const RESTART_WAIT = 500;
const MESSAGE_WAIT = 1000;

export default class GameController {
  constructor(app) {
    this.app = app;
    this._playerCards = [];
    this._dealerCards = [];
    this.dealer = new Dealer();
    this.setup();
  }

  get gameState() {
    return this._gameState;
  }

  set gameState(s) {
    this._gameState = s;
  }


  get playerCards() {
    return this._playerCards;
  }

  get dealerCards() {
    return this._dealerCards;
  }

  deal() {
    this.gameState = 'Dealing';
    if (this.app.mounted) {
      this.app.setState({});
    }
    this.dealer.deal();
  }

  hit() {
    this.dealer.hit();
  }

  stay() {
    this.playerStays = true;
    this.gameState = 'Stay';
    if ( this.dealerShouldHit() ) {
      this.dealer.dealToDealer();
    } else {
      this.dealerStays = true;
      this.calculateGameState();
    }
  }

  playerBust() {
    return this.playerScore > 21
  }

  dealerBust() {
    return this.dealerScore > 21
  }

  bust() {
    return (this.playerBust() || this.dealerBust());
  }

  playerBlackjack() {
    return (this._playerCards.length === 2
          && this.playerHasAce
          && this.playerScore === 11);
  }

  dealerBlackjack() {
    return (this._playerCards.length === 2
          && this.dealerHasAce
          && this.dealerScore === 11);
  }

  blackjack() {
    return (this.playerBlackjack() || this.dealerBlackjack())
  }

  firstCardsJustDealt() {
    return (this._playerCards.length === 2 &&
            this._dealerCards.length === 2);
  }

  dealerShouldHit() {
    // dealer hits on soft 17 (ace & 6), stays on all 18+
    return ( this.playerStays &&
            (this.dealerScore < 17 ||
            (this.dealerHasAce && this.dealerScore < 7)));
  }

  doFinalState(state) {
    this.gameState = state;
    if (this.app.mounted) {
      this.app.setState({});
    }
    this.logLastGame();
  }

  calculateGameState() {
    // If exactly 4 cards have been dealt
    if (this.firstCardsJustDealt()) {
      // Blackjack
      if ( this.blackjack()) {
        if (!this.playerBlackjack()) {
          setTimeout(() => {
            this.doFinalState('Lose');
          }, MESSAGE_WAIT)
        }
        else if (!this.dealerBlackjack()) {
          setTimeout(() => {
            this.doFinalState('Win');
          }, MESSAGE_WAIT)
        }
        else {
          setTimeout(() => {
            this.doFinalState('Tie');
          }, MESSAGE_WAIT)
        }
      }
      // Bust
      else if ( this.bust() ) {
        this.gameState = 'Bust';

        if(!this.playerBust()) {
          setTimeout(() => {
            this.doFinalState('Win');
          }, MESSAGE_WAIT)
        }
        if(!this.dealerBust()) {
          setTimeout(() => {
            this.doFinalState('Lose');
          }, MESSAGE_WAIT)
        }
      } else {
        this.gameState = 'Dealt';
      }
      // In case both stay after 2 cards
      if ( this.playerStays &&  this.dealerStays ) {
        this.scoreAfterBothStay();
      }
    }
    // After the first four cards are dealt
    else {
      // If player and dealer have stayed
      if ( this.playerStays &&  this.dealerStays ) {
        this.scoreAfterBothStay();
      }

      // Otherwise, if bust before staying
      else if ( this.playerBust() ) {
        this.gameState = 'Bust';
        setTimeout(() => {
          this.doFinalState('Lose');
        }, MESSAGE_WAIT)
      } else if ( this.dealerBust() ) {
        setTimeout(() => {
          this.doFinalState('Win');
        }, MESSAGE_WAIT)
      }
    }
    if (this.app.mounted) {
      this.app.setState({});
    }
  }

  scoreAfterBothStay() {
    if ( this.dealerBust() ) {
      this.gameState = 'Bust';
      setTimeout(() => {
        this.doFinalState('Win');
      }, MESSAGE_WAIT)
    } else {
      if ( this.playerScore <= 11 && this.playerHasAce ) {
        this.playerScore += 10;
      }
      if ( this.dealerScore <= 11 && this.dealerHasAce ) {
        this.dealerScore += 10;
      }
      if ( this.playerScore > this.dealerScore ) {
        this.doFinalState('Win');
      } else if ( this.playerScore < this.dealerScore ) {
        this.doFinalState('Lose');
      } else {
        this.doFinalState('Tie');
      }
    }
  }

  setUpSubscription() {
    this.dealer.deal$.subscribe(c => {
      // Every time an item is received from deal$
      // make sure that it's a card not a trigger
      if (Array.isArray(c)) {
        let card = c[1][1];
        let receiver = c[1][0];
        if (receiver === 'd') {
          this._dealerCards.push(card);
          if (card.value === 1) { this.dealerHasAce = true }
          this.dealerScore += card.value;
          if (this.dealerShouldHit() ) {
            setTimeout(() => {
              this.dealer.dealToDealer();
            }, MESSAGE_WAIT);
          } else if (this.playerStays) {
            this.dealerStays = true;
            this.calculateGameState();
          }
        } else if (receiver === 'p') {
          this._playerCards.push(card);
          if (card.value === 1) { this.playererHasAce = true }
          this.playerScore += card.value;
        }

        if (this.blackjack()) {
          this.gameState = 'Blackjack';
        }
        if (this.bust()) {
          this.gameState = 'Bust';
        }

        this.calculateGameState();
      }
    });
  }

  playAgain(){
    this.restart();
  }

  restart() {
    setTimeout(() => {
      this.dealer.freshDeck();
      // clear the arrays while keeping the reference
      this._playerCards.length = 0;
      this._dealerCards.length = 0;
      this.setup();
    }, RESTART_WAIT);
  }

  setup() {
    this.playerScore = 0;
    this.dealerScore = 0;
    this.playerHasAce = false;
    this.dealerHasAce = false;
    this.playerStays = false;
    this.dealerStays = false;
    this.gameState = 'Start';
    this.dealer.freshDeck();
    this.setUpSubscription();
    if (this.app.mounted) {
      this.app.setState({});
    }
  }

  logLastGame() {
    console.log('Game Over')
    console.log(`Dealer cards: `);
    this._dealerCards.forEach(c => {
      console.log(`    ${c.face} of ${c.suit}s`);
    })
    console.log(`Player cards: `);
    this._playerCards.forEach(c => {
      console.log(`    ${c.face} of ${c.suit}s`);
    })
    console.log(`Dealer total: ${this.dealerScore}`);
    console.log(`Player total: ${this.playerScore}`);
    console.log(`Final state: ${this.gameState}`);
    console.log();
  }
}
