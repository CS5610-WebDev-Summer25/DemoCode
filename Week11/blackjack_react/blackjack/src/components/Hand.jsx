import CardView from './CardView';
import '../style/Hand.css';

export default function Hand({ dealer, cards, app }) {
    const handContent =
        cards.map((card, i) =>
            <div className='hand' key={i}>
                <CardView card={card} app={app} />
            </div>
        )

    return (
        <div className='hand-container'>
            { handContent }
        </div>
    )
}
