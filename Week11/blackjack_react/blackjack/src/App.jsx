import React from 'react'
import Card from './services/Card';
import Hand from './components/Hand';
import ButtonPanel from './components/ButtonPanel';

import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dealerCards: [new Card('spade', '5')],
      playerCards: [new Card('heart', 'queen'), new Card('diamond', '10')]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Hand dealer={true} cards={this.state.dealerCards} app={this}/>
          <ButtonPanel />
          <Hand dealer={false} cards={this.state.playerCards} app={this}/>
        </header>
      </div>
    );
  }
}

export default App;
