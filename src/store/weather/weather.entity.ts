export interface WeatherState {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface CityNameState {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Rain {
  "1h"?: number;
  "3h"?: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
  pod?: Pod;
}

export interface Weather {
  id: number;
  main: MainEnum;
  description: Description;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number; // Puede ser opcional
}

export interface LocalNames {
  ru?: string;
  he?: string;
  fr?: string;
  es?: string;
  hi?: string;
  ko?: string;
  ur?: string;
  lt?: string;
  uk?: string;
  zh?: string;
  en?: string;
  pt?: string;
}

export interface ForecastWeatherState {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface List {
  dt: number;
  main: MainClass;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: Date;
}

export interface MainClass {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export enum Pod {
  D = "d",
  N = "n",
}

export enum Description {
  BrokenClouds = "broken clouds",
  ClearSky = "clear sky",
  FewClouds = "few clouds",
  LightRain = "light rain",
  OvercastClouds = "overcast clouds",
  ScatteredClouds = "scattered clouds",
}

export enum MainEnum {
  Clear = "Clear",
  Clouds = "Clouds",
  Rain = "Rain",
}
