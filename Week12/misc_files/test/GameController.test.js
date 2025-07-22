import App from '../App';
import GameController from '../services/GameController.js';


describe('GameController', ()=>{
  const app = new App();

  test('constructor initializes values correctly', () => {
    const gc = new GameController(app);
    expect(gc.playerCards.length).toEqual(0);
    expect(gc.dealerCards.length).toEqual(0);
    expect(gc.playerScore).toEqual(0);
    expect(gc.dealerScore).toEqual(0);
    expect(gc.playerHasAce).toEqual(false);
    expect(gc.dealerHasAce).toEqual(false);
    expect(gc.playerStays).toEqual(false);
    expect(gc.dealerStays).toEqual(false);
    expect(gc.gameState).toEqual('Start');
  });
});

describe('Scoring and game state calculation', ()=>{
  const app = new App();

  test('calculates loss correctly', () => {
    const gc = new GameController(app);
    gc.playerScore = 17;
    gc.dealerScore = 18
    gc.dealerStays = true;
    gc.playerStays = true;
    gc.calculateGameState();
    expect(gc.gameState).toEqual('Lose');
  });

  test('calculates win correctly', () => {
    const gc = new GameController(app);
    gc.playerScore = 18;
    gc.dealerScore = 17;
    gc.dealerStays = true;
    gc.playerStays = true;
    gc.calculateGameState();
    expect(gc.gameState).toEqual('Win');
  });

  test('calculates tie correctly', () => {
    const gc = new GameController(app);
    gc.playerScore = 18;
    gc.dealerScore = 18;
    gc.dealerStays = true;
    gc.playerStays = true;
    gc.calculateGameState();
    expect(gc.gameState).toEqual('Tie');
  });

});

