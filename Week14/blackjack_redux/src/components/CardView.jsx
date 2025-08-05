import ReactCardFlip from 'react-card-flip';

export default function CardView({ card:{rank, suit, flip}, shouldFlip = false }) {
    const readRank = rank === '1'? 'ace' : rank;
    const isFlipped = shouldFlip ? false : flip;
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <img src={`/png/1x/${rank}_${suit}.png`}
                alt={!isFlipped ? `${readRank} of ${suit}` : ""}/>
            <img src={`/png/1x/back-blue.png`}
                alt={isFlipped ? "card back" : ""}/>
        </ReactCardFlip>
    )
}
