import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CityNameState,
  ForecastWeatherState,
  WeatherState,
} from "./weather.entity";

interface InitialWeatherState {
  citySearch: CityNameState[];
  cityCurrentWeather: WeatherState | null;
  cityForecastWeather: ForecastWeatherState | null;
  error: string | null;
}

const initialState: InitialWeatherState = {
  citySearch: [],
  cityCurrentWeather: null,
  cityForecastWeather: null,
  error: null,
};
export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    searchCity: (state, action: PayloadAction<CityNameState[]>) => {
      state.citySearch = action.payload;
      state.error = null;
    },
    loadWeatherCity: (state, action: PayloadAction<WeatherState>) => {
      state.cityCurrentWeather = action.payload;
      state.error = null;
    },
    loadForecastWeatherCity: (
      state,
      action: PayloadAction<ForecastWeatherState>
    ) => {
      state.cityForecastWeather = action.payload;
      state.error = null;
    },
    clearWeatherData: (state) => {
      state.cityCurrentWeather = null;
      state.cityForecastWeather = null;
      state.citySearch = [];
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions, reducer } = weatherSlice;
