import { connect } from 'react-redux';
import CardView from './CardView';
import '../style/Hand.css';


const Hand = ({ dealer, cards, tabindexbase }) => {
  const handContent =
  cards.length === 0 ?
  <div className='hand'>
    <div>
      <img src={`/placeholder.png`} alt=""/>
    </div>
  </div>
  :
  cards.map((card, i) =>
    <div className='hand' key={i}
      tabIndex={i+tabindexbase+1}>
      <CardView
        card={card}
        shouldFlip={dealer && i === 0 && cards.length === 2}
      />
    </div>
  );

  return (
    <div className='hand-container'
      tabIndex={tabindexbase}
      aria-label={ (dealer ? 'dealer' : 'player') + ' cards'}>
      { handContent }
    </div>
  )
}

const selectCards = (state, dealer) => {
    if (dealer) return state.dealerCards
    else return state.playerCards
}

const mapStateToProps = (state, ownProps) => ({
  cards: selectCards(state, ownProps.dealer),
});

export default connect(mapStateToProps)(Hand);
