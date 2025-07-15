import ReactCardFlip from 'react-card-flip';

export default function CardView( { card, app }) {
    return (
        <ReactCardFlip isFlipped={card.flip} flipDirection="horizontal">
            <div onClick={
                () => {
                    card.flipOver();
                    app.setState({});
                }
            }>
                <img src={`/png/1x/${card.rank}_${card.suit}.png`} alt=""/>
            </div>

            <div onClick={
                () => {
                    card.flipOver();
                    app.setState({});
                }
            }>
                <img src={`/png/1x/back-blue.png`} alt=""/>
            </div>

        </ReactCardFlip>
    )
}
