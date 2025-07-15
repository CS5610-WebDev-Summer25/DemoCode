export default class Card {
    constructor(suit, rank) {
        this._suit = suit;
        this._rank = rank;
        this._flip = false;
    }

    get suit() {
        return this._suit;
    }

    get rank() {
        return this._rank;
    }

    get flip() {
        return this._flip;
    }

    set flip(f) {
        this._flip = f;
    }

    flipOver() {
        this._flip = !this._flip;
    }

    get value() {
        return (
            this._rank === 'king' ||
            this._rank === 'queen' ||
            this._rank === 'jack') ? 10: Number(this._rank);
    }
}
