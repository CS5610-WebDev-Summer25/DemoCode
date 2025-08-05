import { configureStore } from '@reduxjs/toolkit';
import { dealerCards, playerCards, status } from './reducers';

export const store = configureStore({
  reducer: {
    status,
    dealerCards,
    playerCards,
  }
});
