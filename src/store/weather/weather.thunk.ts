import { Dispatch } from "@reduxjs/toolkit";
import { actions } from "./weather.slice";
import axios from "axios";
import { dispatchable } from "../dispatchable";
import { API_KEY } from "../../config/env";

export type Action = {
  type: string;
  payload?: any;
};

export const searchCity = dispatchable((cityName: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
      );

      console.log("result.data", result.data);

      if (result.data.length > 0) {
        console.log("entra el if?");
        dispatch(actions.searchCity(result.data));
        return result.data;
      } else {
        console.log("else");
        dispatch(actions.setError("City not founded"));
      }
    } catch (error) {
      dispatch(actions.setError("Failed to fetch city data"));
    }
  };
});

export const loadCurrentWeather = dispatchable((lat: number, lon: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      console.log("result.data", result.data);

      if (result && result.data) {
        dispatch(actions.loadWeatherCity(result.data));
      } else {
        dispatch(
          actions.setError("No data returned from current weather request")
        );
      }
    } catch (error) {
      dispatch(actions.setError("Failed to fetch current weather data"));
    }
  };
});

export const loadForecastWeather = dispatchable((lat: number, lon: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      if (result && result.data) {
        dispatch(actions.loadForecastWeatherCity(result.data));
      } else {
        dispatch(
          actions.setError("No data returned from forecast weather request")
        );
      }
    } catch (error) {
      dispatch(actions.setError("Failed to fetch forecast weather data"));
    }
  };
});

export const clearWeatherData = dispatchable(() => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(actions.clearWeatherData());
  };
});
