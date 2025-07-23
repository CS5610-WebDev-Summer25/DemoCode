import React from 'react'
import Hand from './components/Hand';
import ButtonPanel from './components/ButtonPanel';
import PlayAgain from './components/PlayAgain';

import GameController from './services/GameController';

import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.gc = new GameController(this);
    this.state = {
      dealerCards: this.gc.dealerCards,
      playerCards: this.gc.playerCards
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 tabIndex={1}>
            Blackjack!
          </h1>
          <Hand
            dealer={true}
            cards={this.state.dealerCards}
            tabindexbase={10}
          />
          <ButtonPanel gc={this.gc}
            tabindexbase={20}/>
          <Hand
            dealer={false}
            cards={this.state.playerCards}
            tabindexbase={30}
          />
          <PlayAgain gc={this.gc}
            tabindexbase={40}/>
        </header>
      </div>
    );
  }
}

export default App;
