import { useWeather } from "@/hooks/useWeather";
import { format } from "date-fns";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import { Loading } from "./Loading";
import { capitalizeFirstLetter } from "../utilities/capitalizeFirstLetter";
import { AnimatePresence, motion } from "framer-motion";
import { getBackgroundClassWeather } from "@/utilities/getBackgroundClassWeather";

const WeatherOfCity = () => {
  const {
    loading,
    selectedCity,
    dailyForecast,
    weatherInfo,
    handleSelectChange,
  } = useWeather();

  return (
    <>
      {weatherInfo.citySearch.length > 0 && (
        <select
          onChange={handleSelectChange}
          className="mt-8 p-2 border rounded outline-gray-600 bg-slate-800"
          defaultValue=""
        >
          <option value="" disabled>
            Select a city
          </option>
          {weatherInfo.citySearch.map((city, index) => (
            <option key={index} value={index}>
              {city.name}, {city.state ? city.state + ", " : ""}
              {city.country}
            </option>
          ))}
        </select>
      )}
      {loading && <Loading />}
      <AnimatePresence>
        {selectedCity && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {weatherInfo.cityCurrentWeather && (
              <>
                <h2 className="text-2xl font-bold mt-14 mb-4">
                  Current Weather in {weatherInfo.cityCurrentWeather.name}
                </h2>
                <div
                  className={`flex flex-col items-center justify-center mt-6 border-2 rounded-lg shadow-lg p-8 ${
                    weatherInfo.cityCurrentWeather.weather[0].main === "Clear"
                      ? "text-amber-100 bg-gradient-to-r from-blue-500 to-yellow-200"
                      : weatherInfo.cityCurrentWeather.weather[0].main ===
                        "Clouds"
                      ? "text-slate-700 bg-gradient-to-r from-gray-400 to-gray-200"
                      : weatherInfo.cityCurrentWeather.weather[0].main ===
                        "Rain"
                      ? "bg-gradient-to-r from-blue-800 to-gray-400"
                      : weatherInfo.cityCurrentWeather.weather[0].main ===
                        "Snow"
                      ? "bg-gradient-to-r from-blue-200 to-white"
                      : "bg-gradient-to-r from-gray-300 to-gray-100"
                  }`}
                >
                  <Image
                    src={`https://openweathermap.org/img/wn/${weatherInfo.cityCurrentWeather.weather[0].icon}@2x.png`}
                    alt={weatherInfo.cityCurrentWeather.weather[0].description}
                    width={100}
                    height={100}
                    className="mb-4"
                  />
                  <p className="text-xl font-semibold capitalize mb-2">
                    {capitalizeFirstLetter(
                      weatherInfo.cityCurrentWeather.weather[0].description
                    )}
                  </p>
                  <div className="text-center">
                    <p className="text-lg">
                      <strong>Temperature:</strong>{" "}
                      {Math.round(
                        weatherInfo.cityCurrentWeather.main.temp - 273.15
                      )}
                      °C
                    </p>
                    <p className="text-lg">
                      <strong>Feels Like:</strong>{" "}
                      {Math.round(
                        weatherInfo.cityCurrentWeather.main.feels_like - 273.15
                      )}
                      °C
                    </p>
                    <p className="text-lg">
                      <strong>Humidity:</strong>{" "}
                      {weatherInfo.cityCurrentWeather.main.humidity}%
                    </p>
                    <p className="text-lg">
                      <strong>Wind Speed:</strong>{" "}
                      {weatherInfo.cityCurrentWeather.wind.speed} m/s
                    </p>
                    <p className="text-lg">
                      <strong>Visibility:</strong>{" "}
                      {weatherInfo.cityCurrentWeather.visibility / 1000} km
                    </p>
                  </div>
                </div>
              </>
            )}
            <div className="mt-16">
              {dailyForecast && dailyForecast.length > 0 && (
                <div className="flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
                  <ul className="mt-6 flex flex-col md:flex-row gap-6">
                    {dailyForecast.map((forecast) => (
                      <motion.li
                        key={forecast.dt}
                        className="flex flex-col items-center p-4 border rounded-lg shadow-md"
                      >
                        <h3 className="text-lg font-semibold">
                          {format(new Date(forecast.dt_txt), "eeee, MMMM d")}
                        </h3>
                        <Image
                          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                          alt={forecast.weather[0].description}
                          width={96}
                          height={96}
                        />
                        <p className="text-md">
                          {capitalizeFirstLetter(
                            forecast.weather[0].description
                          )}
                        </p>
                        <p className="text-md">
                          <strong>Temperature:</strong>{" "}
                          {Math.round(forecast.main.temp - 273.15)}°C
                        </p>
                        <p className="text-md">
                          <strong>Humidity:</strong> {forecast.main.humidity}%
                        </p>
                        <p className="text-md">
                          <strong>Wind Speed:</strong> {forecast.wind.speed} m/s
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeatherOfCity;
