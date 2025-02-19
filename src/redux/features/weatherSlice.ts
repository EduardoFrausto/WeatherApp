import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {Place} from '../../models/place.ts';

interface WeatherSliceInitialState {
  loadingCities: boolean;
  cities: Place[];

  selectedLongitude: string;
  selectedLatitude: string;
  selectedCityName: string;
}

const initialState: WeatherSliceInitialState = {
  loadingCities: false,
  cities: [],

  selectedLongitude: '0.0',
  selectedLatitude: '0.0',
  selectedCityName: '',
};

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    clearWeatherSlice: () => initialState,
    clearCities: state => {
      state.cities = [];
    },
    setSelectedCity: (
      state,
      action: PayloadAction<{
        selectedLongitude: string;
        selectedLatitude: string;
        selectedCityName: string;
      }>,
    ) => {
      state.selectedLongitude = action.payload.selectedLongitude;
      state.selectedLatitude = action.payload.selectedLatitude;
      state.selectedCityName = action.payload.selectedCityName;
    },
  },
  extraReducers: builder => {
    builder.addCase(searchCity.pending, state => {
      state.loadingCities = true;
    });
    builder.addCase(searchCity.fulfilled, (state, action) => {
      state.loadingCities = false;
      state.cities = action.payload.filter(
        value => value.result_type === 'city',
      );
    });
    builder.addCase(searchCity.rejected, state => {
      state.loadingCities = false;
      state.cities = [];
    });
  },
});

const searchCity = createAsyncThunk(
  'weatherSlice/searchCity',
  async (city: string) => {
    try {
      const response = await axios.get<Place[]>(
        `https://search.reservamos.mx/api/v2/places?q=${city}`,
      );
      return response.data;
    } catch (e) {
      return [];
    }
  },
);

export const {clearWeatherSlice, clearCities, setSelectedCity} =
  weatherSlice.actions;

export default weatherSlice.reducer;

export {searchCity};
