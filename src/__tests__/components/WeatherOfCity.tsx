import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherOfCity from "../../components/WeatherOfCity";
import { useWeather } from "../../hooks/useWeather";

jest.mock("../../hooks/useWeather");

describe("WeatherOfCity", () => {
  beforeEach(() => {
    (useWeather as jest.Mock).mockReturnValue({
      loading: false,
      selectedCity: null,
      dailyForecast: [],
      weatherInfo: {
        citySearch: [],
        cityCurrentWeather: null,
      },
      handleSelectChange: jest.fn(),
    });
  });

  it("displays the Loading component when loading", () => {
    (useWeather as jest.Mock).mockReturnValueOnce({
      loading: true,
      selectedCity: null,
      dailyForecast: [],
      weatherInfo: {
        citySearch: [],
        cityCurrentWeather: null,
      },
      handleSelectChange: jest.fn(),
    });

    render(<WeatherOfCity />);
  });

  it("displays the city selection dropdown when there are search results", () => {
    (useWeather as jest.Mock).mockReturnValueOnce({
      loading: false,
      selectedCity: null,
      dailyForecast: [],
      weatherInfo: {
        citySearch: [
          { name: "New York", state: "NY", country: "US" },
          { name: "Los Angeles", state: "CA", country: "US" },
        ],
        cityCurrentWeather: null,
      },
      handleSelectChange: jest.fn(),
    });

    render(<WeatherOfCity />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveDisplayValue("Select a city");
  });

  it("displays the current weather information when a city is selected and not loading", () => {
    (useWeather as jest.Mock).mockReturnValueOnce({
      loading: false,
      selectedCity: { name: "New York", state: "NY", country: "US" },
      dailyForecast: [],
      weatherInfo: {
        citySearch: [],
        cityCurrentWeather: {
          name: "New York",
          weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
          main: { temp: 295.15, feels_like: 294.15, humidity: 50 },
          wind: { speed: 5 },
          visibility: 10000,
        },
      },
      handleSelectChange: jest.fn(),
    });

    render(<WeatherOfCity />);

    const weatherInfo = screen.getByText(/Current Weather in New York/i);
    expect(weatherInfo).toBeInTheDocument();
    expect(screen.getByText(/Temperature:/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity:/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind Speed:/i)).toBeInTheDocument();
    expect(screen.getByText(/Visibility:/i)).toBeInTheDocument();
  });

  it("calls handleSelectChange when a city is selected from the dropdown menu", () => {
    const handleSelectChange = jest.fn();
    (useWeather as jest.Mock).mockReturnValueOnce({
      loading: false,
      selectedCity: null,
      dailyForecast: [],
      weatherInfo: {
        citySearch: [
          { name: "New York", state: "NY", country: "US" },
          { name: "Los Angeles", state: "CA", country: "US" },
        ],
        cityCurrentWeather: null,
      },
      handleSelectChange,
    });

    render(<WeatherOfCity />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "0" } });

    expect(handleSelectChange).toHaveBeenCalledTimes(1);
  });
});
