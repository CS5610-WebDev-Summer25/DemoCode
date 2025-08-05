import { connect } from 'react-redux';
import '../style/ButtonPanel.css';
import '../style/PlayAgain.css';

const PlayAgain = ({ gc, status, tabindexbase }) => {
    return (
      <div>
      { ( status === 'Win' ||
          status === 'Lose' ||
          status === 'Tie' ) ?
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

const mapStateToProps = state => ({
  status: state.status,
});

export default connect(mapStateToProps)(PlayAgain);
