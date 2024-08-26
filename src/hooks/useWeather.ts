import { useState, useCallback, ChangeEvent } from "react";
import { useAppSelector } from "../store/root.store";
import { City } from "../interfaces/cityInterfaces";
import { List } from "../store/weather/weather.entity";
import { actions } from "../store/root.store";

export function useWeather() {
  const weatherInfo = useAppSelector((state) => state.weathers);
  const [cityName, setCityName] = useState("");
  const [previousCityName, setPreviousCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const loadNamesCities = async (cityName: string) => {
    setLoading(true);
    actions.weathers.clearWeatherData();
    await actions.weathers.searchCity(cityName);
    setPreviousCityName(cityName);
    setLoading(false);
  };

  const loadWeather = async (lat: number, lon: number) => {
    setLoading(true);
    await actions.weathers.loadCurrentWeather(lat, lon);
    await actions.weathers.loadForecastWeather(lat, lon);
    setLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (cityName.trim() === "" || cityName === previousCityName) {
      return;
    }
    await loadNamesCities(cityName);
    setCityName("");
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    loadWeather(city.lat, city.lon);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedCityIndex = event.target.value;
    if (selectedCityIndex) {
      const city = weatherInfo.citySearch[parseInt(selectedCityIndex)];
      handleCitySelect(city);
    }
  };

  const getDailyForecast = (list: List[]) => {
    const dailyForecast = [];
    const seenDates = new Set();
    for (const forecast of list) {
      const date = new Date(forecast.dt_txt).toISOString().split("T")[0];
      if (!seenDates.has(date)) {
        seenDates.add(date);
        dailyForecast.push(forecast);
      }
      if (dailyForecast.length >= 5) {
        break;
      }
    }
    return dailyForecast;
  };

  const dailyForecast = weatherInfo?.cityForecastWeather?.list
    ? getDailyForecast(weatherInfo.cityForecastWeather.list)
    : [];

  return {
    cityName,
    previousCityName,
    loading,
    selectedCity,
    dailyForecast,
    weatherInfo,
    setCityName,
    handleSubmit,
    handleCitySelect,
    handleSelectChange,
  };
}
