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
}

const initialState: InitialWeatherState = {
  citySearch: [],
  cityCurrentWeather: null,
  cityForecastWeather: null,
};
export const weatherSlice = createSlice({
  name: "weather",
  initialState: initialState,
  reducers: {
    searchCity: (state, action: PayloadAction<CityNameState[]>) => {
      state.citySearch = action.payload;
    },
    loadWeatherCity: (state, action: PayloadAction<WeatherState>) => {
      state.cityCurrentWeather = action.payload;
    },
    loadForecastWeatherCity: (
      state,
      action: PayloadAction<ForecastWeatherState>
    ) => {
      state.cityForecastWeather = action.payload;
    },
    clearWeatherData: (state) => {
      state.cityCurrentWeather = null;
      state.cityForecastWeather = null;
      state.citySearch = [];
    },
  },
});

export const { actions, reducer } = weatherSlice;
