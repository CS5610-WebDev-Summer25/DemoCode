import ReactCardFlip from 'react-card-flip';

export default function CardView( { card, app }) {
    const readRank = card.rank === '1'? 'ace' : card.rank;
    return (
        <ReactCardFlip isFlipped={card.flip} flipDirection="horizontal">
            <div onClick={
                () => {
                    card.flipOver();
                    app.setState({});
                }
            }>
                <img
                src={`/png/1x/${card.rank}_${card.suit}.png`}
                alt={!card.flip ? `${readRank} of ${card.suit}` : ""}/>
            </div>

            <div onClick={
                () => {
                    card.flipOver();
                    app.setState({});
                }
            }>
                <img
                src={`/png/1x/back-blue.png`}
                alt={card.flip ? "card back" : ""}/>
            </div>

        </ReactCardFlip>
    )
}
