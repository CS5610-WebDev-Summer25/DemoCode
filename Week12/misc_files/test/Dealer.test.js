/* eslint-disable jest/no-conditional-expect */
import Card from '../services/Card.js';
import Dealer from '../services/Dealer.js';
import { take } from 'rxjs';

describe('Dealer', ()=>{
  test('initializes a fresh deck of cards', ()=>{
    const dealer = new Dealer();
    expect(dealer.deck.length).toEqual(52);
  });
});

describe('Deal observable', ()=>{
  test('begins with a true target value', async () => {
    const dealer = new Dealer();
    const result = await new Promise(resolve => {
      dealer.deal$.pipe(take(1)).subscribe(data => {
        resolve(data);
      });
      dealer.deal();
    });
    expect(result).toEqual(true);
  });

  test('deals first four cards', async () => {
    let count = 0;
    const dealer = new Dealer();

    const result = await new Promise(resolve => {
      dealer.deal$.pipe(take(5)).subscribe({
        next: data => {
          if (count < 4) {
            count++;
          } else {
            resolve(data);
          }
        }
      });
      dealer.deal();
    });

    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(3);
    expect(result[1][0]).toEqual('d');
    expect(result[1][1] instanceof Card).toEqual(true);
  });
});
