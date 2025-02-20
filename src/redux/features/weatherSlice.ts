import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {Place, SelectedCity} from '../../models/place.ts';
import {WeatherForecast, WeatherSectionItem} from '../../models/weather.ts';
import {RootState} from '../app/store.ts';
// @ts-ignore
import {API_OPEN_WEATHER} from '@env';

interface WeatherSliceInitialState {
  loadingCities: boolean;
  cities: Place[];

  selectedCities: SelectedCity[];

  loadingWeather: boolean;
  weatherSectionList: WeatherSectionItem[];
}

const initialState: WeatherSliceInitialState = {
  loadingCities: false,
  cities: [],

  selectedCities: [],

  loadingWeather: false,
  weatherSectionList: [],
};

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState,
  reducers: {
    clearCities: state => {
      state.cities = [];
    },
    addSelectedCity: (
      state,
      action: PayloadAction<{
        id: number;
        selectedLongitude: string;
        selectedLatitude: string;
        selectedCityName: string;
        selectedCityState: string;
      }>,
    ) => {
      const selectedCityIndex = state.selectedCities.findIndex(
        tmp => tmp.selectedCityName === action.payload.selectedCityName,
      );
      if (selectedCityIndex < 0) {
        state.selectedCities.push({
          id: action.payload.id,
          selectedLongitude: action.payload.selectedLongitude,
          selectedLatitude: action.payload.selectedLatitude,
          selectedCityName: action.payload.selectedCityName.trim(),
          selectedCityState: action.payload.selectedCityState.trim(),
        });
      }
    },
    removeSelectedCity: (state, action: PayloadAction<number>) => {
      state.selectedCities = state.selectedCities.filter(
        item => item.id !== action.payload,
      );
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

    builder.addCase(searchWeather.pending, state => {
      state.loadingWeather = true;
    });
    builder.addCase(searchWeather.fulfilled, (state, action) => {
      state.loadingWeather = false;
      state.weatherSectionList = [];
      const payload = action.payload;
      payload.forEach((cityWeatherForecast, index) => {
        const newSection: WeatherSectionItem = {
          title: `${state.selectedCities[index].selectedCityName}, ${state.selectedCities[index].selectedCityState}`,
          data: [],
        };
        cityWeatherForecast.list.forEach(item => {
          const currentDate = new Date(item.dt * 1000);
          const dateString = currentDate.toLocaleDateString();
          const dayWeatherIndex = newSection.data.findIndex(
            dayWeather => dayWeather.date === dateString,
          );
          if (dayWeatherIndex >= 0) {
            if (
              newSection.data[dayWeatherIndex].temp_min > item.main.temp_min
            ) {
              newSection.data[dayWeatherIndex].temp_min = item.main.temp_min;
            }
            if (
              newSection.data[dayWeatherIndex].temp_max < item.main.temp_max
            ) {
              newSection.data[dayWeatherIndex].temp_max = item.main.temp_max;
            }
          } else {
            newSection.data.push({
              date: dateString,
              temp_max: item.main.temp_max,
              temp_min: item.main.temp_min,
            });
          }
        });
        state.weatherSectionList.push(newSection);
      });
    });
    builder.addCase(searchWeather.rejected, state => {
      state.loadingWeather = false;
      state.weatherSectionList = [];
    });
  },
});

const searchCity = createAsyncThunk(
  'weatherSlice/searchCity',
  async (city: string) => {
    try {
      const response = await axios.get<Place[]>(
        `https://search.reservamos.mx/api/v2/places?q=${city}`,
        {
          params: {
            q: city,
          },
        },
      );
      return response.data;
    } catch (e) {
      return [];
    }
  },
);

const searchWeather = createAsyncThunk(
  'weatherSlice/searchWeather',
  async (_, {getState}) => {
    try {
      const {selectedCities} = (getState() as RootState).weatherSlice;
      if (selectedCities.length === 0) {
        return [];
      }
      const apiKey = API_OPEN_WEATHER;
      const promises: Promise<AxiosResponse<WeatherForecast, any>>[] = [];
      selectedCities.forEach(city => {
        promises.push(
          axios.get<WeatherForecast>(
            'https://api.openweathermap.org/data/2.5/forecast',
            {
              params: {
                lat: city.selectedLatitude,
                lon: city.selectedLongitude,
                appid: apiKey,
                units: 'metric',
                lang: 'es',
              },
            },
          ),
        );
      });
      const responses = await Promise.all(promises);
      return responses.map(response => response.data);
    } catch (e) {
      return [];
    }
  },
);

export const {clearCities, addSelectedCity, removeSelectedCity} =
  weatherSlice.actions;

export default weatherSlice.reducer;

export {searchCity, searchWeather};
