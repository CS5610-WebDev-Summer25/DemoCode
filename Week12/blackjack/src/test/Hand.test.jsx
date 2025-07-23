import { render } from '@testing-library/react';
import Card from '../services/Card';
import Hand from '../components/Hand';

describe('Hand', ()=>{
  test('has correct number and values of cards', () => {
    const card1 = new Card('diamond', 'king');
    const card2 = new Card('spade', '5');
    const card3 = new Card('heart', 'jack');
    card3.flipOver();
    const hand = render(
      <Hand dealer={true}
            cards={[card1, card2, card3]}
            tabindexbase={10}/>
    );
    expect(hand.queryAllByAltText(/card back/).length).toEqual(1);
    expect(hand.queryAllByAltText(/diamond/).length).toEqual(1);
    expect(hand.queryAllByAltText(/spade/).length).toEqual(1);
    expect(hand.queryAllByAltText(/heart/).length).toEqual(0);
    expect(hand.queryAllByAltText(/card back/).length).toEqual(1);
  });
});
