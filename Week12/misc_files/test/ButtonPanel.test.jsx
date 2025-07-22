import {fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import ButtonPanel from '../components/ButtonPanel';
import GameController from '../services/GameController.js';

const app = new App();

describe('Button Panel', () => {
  test('displays DEAL button initially', () => {
    const gc = new GameController(app);
    render(
      <ButtonPanel gc={gc}
              tabindexbase={20} />
    );
    const buttonText = screen.getByText("DEAL");
    expect(buttonText).toBeInTheDocument();

  });

  test('triggers DEAL behavior', () => {
    const gc = new GameController(app);
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const buttonElement = screen.getAllByText("DEAL");
    fireEvent.click(buttonElement[1]);
    expect(gc.gameState).toEqual("Dealing");
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const messageElement = screen.getByText("DEALING");
    expect(messageElement).toBeInTheDocument();
  });

  test('displays HIT/STAY buttons in Dealt state', () => {
    const gc = new GameController(app);
    gc.gameState = 'Dealt';
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const buttonElements = screen.getAllByText(/HIT|STAY/);
    expect(buttonElements.length).toEqual(2);
  });

  test('displays DEALING message in Dealing state', () => {
    const gc = new GameController(app);
    gc.gameState = 'Dealing';
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const messageElements = screen.getByText("DEALING");
    expect(messageElements).toBeInTheDocument();
  });

  test('displays DEALING message in Stay state', () => {
    const gc = new GameController(app);
    gc.gameState = 'Stay';
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const messageElements = screen.getByText("DEALING");
    expect(messageElements).toBeInTheDocument();
  });

  test('displays BLACKJACK message in Blackjack state', () => {
    const gc = new GameController(app);
    gc.gameState = 'Blackjack';
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const messageElements = screen.getByText("BLACKJACK");
    expect(messageElements).toBeInTheDocument();
  });

  test('displays YOU WIN message in Win state', () => {
    const gc = new GameController(app);
    gc.gameState = 'Win';
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const messageElements = screen.getByText("YOU WIN");
    expect(messageElements).toBeInTheDocument();
  });

  test('displays YOU LOSE message in Lose state', () => {
    const gc = new GameController(app);
    gc.gameState = 'Lose';
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const messageElements = screen.getByText("YOU LOSE");
    expect(messageElements).toBeInTheDocument();
  });

  test('displays TIE message in Tie state', () => {
    const gc = new GameController(app);
    gc.gameState = 'Tie';
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const messageElements = screen.getByText("TIE");
    expect(messageElements).toBeInTheDocument();
  });

  test('displays BUST message in Bust state', () => {
    const gc = new GameController(app);
    gc.gameState = 'Bust';
    render(<App/>);
    render(
      <ButtonPanel gc={gc}
        tabindexbase={20}/>
    );
    const messageElements = screen.getByText("BUST");
    expect(messageElements).toBeInTheDocument();
  });
});