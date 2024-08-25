import { Dispatch } from "@reduxjs/toolkit";
import { actions } from "./weather.slice";
import axios from "axios";
import { dispatchable } from "../dispatchable";
import { API_KEY } from "@/config/env";

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

      if (result && result.data) {
        dispatch(actions.searchCity(result.data));
        return result.data; // Retorna los datos aquí
      } else {
        console.log("Search failed, no data returned");
        return []; // Retorna un array vacío en caso de error
      }
    } catch (error) {
      console.error("Search request failed:", error);
      return []; // También retorna un array vacío en caso de excepción
    }
  };
});

export const loadCurrentWeather = dispatchable((lat: number, lon: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      if (result && result.data) {
        dispatch(actions.loadWeatherCity(result.data));
      } else {
        console.log("Login failed, no data returned");
      }
    } catch (error) {
      console.error("Login request failed:", error);
    }
  };
});

export const loadForecastWeather = dispatchable((lat: number, lon: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const result = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      console.log("result forecast", result);
      if (result && result.data) {
        dispatch(actions.loadForecastWeatherCity(result.data));
      } else {
        console.log("Login failed, no data returned");
      }
    } catch (error) {
      console.error("Login request failed:", error);
    }
  };
});

export const clearWeatherData = dispatchable(() => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(actions.clearWeatherData());
  };
});
