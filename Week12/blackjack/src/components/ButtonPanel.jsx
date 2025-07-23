import '../style/ButtonPanel.css';

export default function ButtonPanel({ gc, tabindexbase }) {
  return (
    <div>
      {
        {
          'Start':
            <button type="button" onClick={() => { gc.deal() }}
                className="deal" tabIndex={tabindexbase+1}>
              <strong>DEAL</strong>
            </button>,
          'Dealt':
            <>
              <button type="button" onClick={() => { gc.hit() }}
                  className="hit"  tabIndex={tabindexbase+1}
                  aria-label="hit">
                <strong>HIT</strong>
              </button>
              <button type="button" onClick={() => { gc.stay() }}
                  className="stay"  tabIndex={tabindexbase+2}
                  aria-label="stay">
                <strong>STAY</strong>
              </button>
            </>,
          'Dealing':
            <div className="message" tabIndex={tabindexbase+1}>
              <strong>DEALING</strong>
            </div>,
          'Stay':
            <div className="message" tabIndex={tabindexbase+1}>
              <strong>DEALING</strong>
            </div>,
          'Blackjack':
            <div className="message" tabIndex={tabindexbase+1}>
              <strong>BLACKJACK</strong>
            </div>,
          'Win':
            <div className="message" tabIndex={tabindexbase+1}>
              <strong>YOU WIN</strong>
            </div>,
          'Lose':
            <div className="message" tabIndex={tabindexbase+1}>
              <strong>YOU LOSE</strong>
            </div>,
          'Tie':
            <div className="message" tabIndex={tabindexbase+1}
              aria-label="tie">
              <strong>TIE</strong>
            </div>,
          'Bust':
            <div className="message" tabIndex={tabindexbase+1}
              aria-label="bust">
              <strong>BUST</strong>
            </div>
        }[gc.gameState]
      }
    </div>
  )
}
