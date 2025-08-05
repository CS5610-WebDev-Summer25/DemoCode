import React from 'react';
import { connect } from 'react-redux';
import { setStatus, dealCard, resetGame } from '../actions';
import Dealer from '../services/Dealer.js';
import Hand from './Hand.jsx';
import ButtonPanel from './ButtonPanel.jsx';
import PlayAgain from './PlayAgain.jsx';

const MESSSAGE_WAIT = 1000;

class GameManager extends React.Component {
  constructor(props) {
    super(props);
    this.dealer = new Dealer();
    this.setup();
  }

  setup() {
    this.playerScore = 0;
    this.dealerScore = 0;
    this.playerHasAce = false;
    this.dealerHasAce = false;
    this.playerStays = false;
    this.dealerStays = false;
    this.dealer.freshDeck();
    this.setUpSubscription();
  }

  render() {
    return (
      <div>
        <Hand dealer={true} tabindexbase={10} />
        <ButtonPanel gc={this} tabindexbase={20} />
        <Hand dealer={false} tabindexbase={30} />
        <PlayAgain gc={this} tabindexbase={40} />
      </div>
    );
  }

  deal() {
    const { setStatus } = this.props;
    setStatus("Dealing");
    this.dealer.deal();
  }

  hit() {
    this.dealer.hit();
  }

  stay() {
    this.playerStays = true;
    if ( this.dealerShouldHit() ) {
      this.dealer.dealToDealer();
    } else {
      this.dealerStays = true;
      this.calculateGameStatus();
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
    const { playerCards } = this.props;
    return (playerCards.length === 2
          && this.playerHasAce
          && this.playerScore === 11);
  }

  dealerBlackjack() {
    const { playerCards } = this.props;
    return (playerCards.length === 2
          && this.dealerHasAce
          && this.dealerScore === 11);
  }

  blackjack() {
    return (this.playerBlackjack() || this.dealerBlackjack())
  }

  dealerShouldHit() {
    // dealer hits on soft 17 (ace & 6), stays on all 18+
    return ( this.playerStays &&
          (this.dealerScore < 17 ||
          (this.dealerHasAce && this.dealerScore < 7)));
  }

  calculateGameStatus() {
    const { playerCards, dealerCards } = this.props;
    this.calculateGameStatusWithCounts(playerCards.length, dealerCards.length);
  }

  calculateGameStatusWithCounts(playerCardCount, dealerCardCount) {
    const { setStatus } = this.props;
    // If exactly 4 cards have been dealt
    const firstCardsDealt = (playerCardCount === 2 && dealerCardCount === 2);

    if (firstCardsDealt) {
      // Blackjack
      if ( this.blackjack()) {
        if (!this.playerBlackjack()) {
          setTimeout(() => {
            this.doFinalStatus('Lose');
           }, MESSSAGE_WAIT)
        }
        else if (!this.dealerBlackjack()) {
          setTimeout(() => {
            this.doFinalStatus('Win');
           }, MESSSAGE_WAIT)
        }
        else {
          setTimeout(() => {
            this.doFinalStatus('Tie');
           }, MESSSAGE_WAIT)
        }
      }
      // Bust
      else if ( this.bust() ) {
        setStatus('Bust');
        if(!this.playerBust()) {
          setTimeout(() => {
            this.doFinalStatus('Win');
           }, MESSSAGE_WAIT)
        }
        if(!this.dealerBust()) {
          setTimeout(() => {
            this.doFinalStatus('Lose');
           }, MESSSAGE_WAIT)
        }
      } else {
        console.log('Setting status to Dealt');
        setStatus('Dealt');
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
        setStatus('Bust');
        setTimeout(() => {
          this.doFinalStatus('Lose');
        }, MESSSAGE_WAIT)
      } else if ( this.dealerBust() ) {
        setTimeout(() => {
          this.doFinalStatus('Win');
        }, MESSSAGE_WAIT)
      }
    }
  }

  scoreAfterBothStay() {
    if ( this.dealerBust() ) {
      setStatus('Bust');
      setTimeout(() => {
        this.doFinalStatus('Win');
      }, MESSSAGE_WAIT)
    } else {
      if ( this.playerScore <= 11 && this.playerHasAce ) {
        this.playerScore += 10;
      }
      if ( this.dealerScore <= 11 && this.dealerHasAce ) {
        this.dealerScore += 10;
      }
      if ( this.playerScore > this.dealerScore ) {
        this.doFinalStatus('Win');
      } else if ( this.playerScore < this.dealerScore ) {
        this.doFinalStatus('Lose');
      } else {
        this.doFinalStatus('Tie');
      }
    }
  }

  setUpSubscription() {
    const { dealCard, setStatus } = this.props;
    // Track cards dealt locally since Redux state updates are async
    let playerCardCount = 0;
    let dealerCardCount = 0;

    // Subscribe to the deal$ observable
    this.dealer.deal$.subscribe(c => {
      // Every time an item is received from deal$
      // Make sure it's a card, not a trigger
      if(Array.isArray(c)) {
        // Extract card from observable
        let card = c[1][1]
        let receiver = c[1][0];
        // Dealer card received
        if (receiver === 'd') {
          dealCard(true, card);
          dealerCardCount++;
          if (card.value === 1) { this.dealerHasAce = true }
          this.dealerScore += card.value;

          if ( this.dealerShouldHit() ) {
            setTimeout(() => {
              this.dealer.dealToDealer();
            }, MESSSAGE_WAIT);
          } else if ( this.playerStays ) {
            this.dealerStays = true;
            this.calculateGameStatusWithCounts(playerCardCount, dealerCardCount);
          }
        // Player card received
        } else if ( receiver === 'p') {
          dealCard(false, card);
          playerCardCount++;
          if (card.value === 1) { this.playerHasAce = true }
          this.playerScore += card.value;
        }
        // Check for immediate blackjack or bust - but only set status,
        // don't override "Dealt"
        // These will be properly handled in calculateGameStatusWithCounts
        this.calculateGameStatusWithCounts(playerCardCount, dealerCardCount);
      }
    });
  }

  doFinalStatus(status) {
    const { setStatus } = this.props;
    setStatus(status);
    this.logLastGame();
  }

  playAgain(){
    this.restart();
  }

  restart() {
    const { resetGame } = this.props;
    resetGame();
    this.setup();
  }

  logLastGame() {
    const { status, dealerCards, playerCards } = this.props;
    console.log('Game Over')
    console.log(`Dealer cards: `);
    dealerCards.forEach(c => {
      console.log(`    ${c.face} of ${c.suit}s`);
    })
    console.log(`Player cards: `);
    playerCards.forEach(c => {
      console.log(`    ${c.face} of ${c.suit}s`);
    })
    console.log(`Dealer total: ${this.dealerScore}`);
    console.log(`Player total: ${this.playerScore}`);
    console.log(`Final state: ${status}`);
    console.log();
  }
}

const mapStateToProps = state => ({
  status: state.status,
  dealerCards: state.dealerCards,
  playerCards: state.playerCards,
});

const mapDispatchToProps = dispatch => ({
  setStatus: status => dispatch(setStatus(status)),
  dealCard: (dealer, card) => dispatch(dealCard(dealer, card)),
  resetGame: () => dispatch(resetGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameManager);
