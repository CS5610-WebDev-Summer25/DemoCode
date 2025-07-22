import '../style/ButtonPanel.css';

export default function ButtonPanel({ gc }) {
  return (
    <div>
      {
        {
          'Start':
            <button type="button" onClick={() => { gc.deal() }}
                className="deal">
              <strong>DEAL</strong>
            </button>,
          'Dealt':
            <>
              <button type="button" onClick={() => { gc.hit() }}
                  className="hit">
                <strong>HIT</strong>
              </button>
              <button type="button" onClick={() => { gc.stay() }}
                  className="stay">
                <strong>STAY</strong>
              </button>
            </>,
          'Dealing':
            <div className="message">
              <strong>DEALING</strong>
            </div>,
          'Stay':
            <div className="message">
              <strong>DEALING</strong>
            </div>,
          'Blackjack':
            <div className="message">
              <strong>BLACKJACK</strong>
            </div>,
          'Win':
            <div className="message">
              <strong>YOU WIN</strong>
            </div>,
          'Lose':
            <div className="message">
              <strong>YOU LOSE</strong>
            </div>,
          'Tie':
            <div className="message">
              <strong>TIE</strong>
            </div>,
          'Bust':
            <div className="message">
              <strong>BUST</strong>
            </div>
        }[gc.gameState]
      }
    </div>
  )
}
