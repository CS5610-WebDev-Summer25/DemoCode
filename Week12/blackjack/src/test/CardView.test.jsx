import {render} from '@testing-library/react';
import Card from '../services/Card';
import CardView from '../components/CardView';

describe('CardView', ()=>{
  test('has correct alt text for card', () => {
    const card = new Card('diamond', 'king');
    const cardView = render(
      <CardView card={card}></CardView>
    );
    expect(cardView.queryByAltText(/king of diamond/)).toBeInTheDocument(1);
  });
});
