import {  DEAL_CARD, SET_STATUS, RESET_GAME } from './actions';

export const dealerCards = (state = [], action) => {
  const { type, payload } = action;
  switch(type) {
    case DEAL_CARD: {
      if (payload.dealer) {
        return state.concat(payload.card);
      } else {
        return state;
      }
    }
    case RESET_GAME:
      return [];
    default:
      return state;
  }
}

export const playerCards = (state = [], action) => {
  const { type, payload } = action;
  switch(type) {
    case DEAL_CARD: {
      if (!payload.dealer) {
        return state.concat(payload.card);
      } else {
        return state;
      }
    }
    case RESET_GAME:
      return [];
    default:
      return state;
  }
}

export const status = (state = 'Start', action) => {
  const { type, payload } = action;
  switch(type) {
    case SET_STATUS:
      return payload.status;
    case RESET_GAME:
      return 'Start';
    default:
      return state;
  }
}
