import {configureStore} from '@reduxjs/toolkit';
import demoSlice from '../features/weatherSlice.ts';

export const store = configureStore({
  reducer: {
    demoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
