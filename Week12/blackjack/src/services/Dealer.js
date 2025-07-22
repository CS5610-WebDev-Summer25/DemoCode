import { Subject, from, timer, zip, concat } from 'rxjs';
import { suits, ranks } from './CardValues.js';
import Card from './Card.js';

export default class Dealer {
  constructor() {
    this.deck = [];
    this.freshDeck();
  }

  freshDeck() {

  }

  deal() {

  }

  hit() {

  }

  dealToDealer() {

  }

  shuffle(array) {
    let currentInd = array.length, temp, randInd;
    while ( 0 !== currentInd ) {
      randInd = Math.floor(Math.random() * currentInd);
      currentInd--;
      temp = array[currentInd];
      array[currentInd] = array[randInd];
      array[randInd] = temp;
    }
    return array;
  }
}
