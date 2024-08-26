import { PayloadAction } from "@reduxjs/toolkit";
import {
  CityNameState,
  ForecastWeatherState,
  WeatherState,
} from "./weather.entity";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  "weather/loadCityName": (
    state: CityNameState,
    action: PayloadAction<CityNameState>
  ) => {
    state = action.payload;
  },
  "weather/loadCurrentWeather": (
    state: WeatherState,
    action: PayloadAction<WeatherState>
  ) => {
    state = action.payload;
  },
  "weather/loadForescatWeather": (
    state: ForecastWeatherState,
    action: PayloadAction<ForecastWeatherState>
  ) => {
    state = action.payload;
  },
};
