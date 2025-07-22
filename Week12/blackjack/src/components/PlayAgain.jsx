import '../style/ButtonPanel.css';
import '../style/PlayAgain.css';

export default function PlayAgain ({  gc, tabindexbase  }) {
    return (
      <div>
      { ( gc.gameState === 'Win' ||
          gc.gameState === 'Lose' ||
          gc.gameState === 'Tie' ) ?
        <button type="button"
          onClick={() => {gc.playAgain()}}
          className="playAgain"
          tabIndex={tabindexbase+1}>
          <strong>PLAY AGAIN</strong>
        </button>
        :
        <div className="playAgainPlaceholder"></div>
      }
    </div>
    )
 };
