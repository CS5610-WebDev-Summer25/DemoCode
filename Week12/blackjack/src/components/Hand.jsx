import CardView from './CardView';
import '../style/Hand.css';


export default function Hand({ dealer, cards, tabindexbase }) {
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
      <CardView card={card}></CardView>
    </div>
  );

  if (dealer && cards.length === 2) {
    handContent[0].props.children.props.card.flip = false;
  }

  return (
    <div className='hand-container'
      tabIndex={tabindexbase}
      aria-label={ (dealer ? 'dealer' : 'player') + ' cards'}>
      { handContent }
    </div>
  )
}
