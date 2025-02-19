import {createSlice} from '@reduxjs/toolkit';

interface WeatherSliceInitialState {}

const initialState: WeatherSliceInitialState = {};

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    clearWeatherSlice: () => initialState,
  },
  extraReducers: builder => {},
});

export const {clearWeatherSlice} = weatherSlice.actions;

export default weatherSlice.reducer;

export {};
