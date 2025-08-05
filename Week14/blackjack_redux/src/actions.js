export const SET_STATUS = 'SET_STATUS';
export const setStatus = status => ({
  type: SET_STATUS,
  payload: { status },
});

export const DEAL_CARD = 'DEAL_CARD';
export const dealCard = (dealer, card) => ({
  type: DEAL_CARD,
  payload: {
    dealer,
    card: {
      suit: card.suit,
      rank: card.rank,
      flip: card.flip,
      value: card.value
    }
  },
});

export const RESET_GAME = 'RESET_GAME';
export const resetGame = () => ({
  type: RESET_GAME,
});
