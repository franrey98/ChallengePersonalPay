import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FormSearchCity from "../../components/FormSearchCity";
import { useWeather } from "../../hooks/useWeather";

jest.mock("../../hooks/useWeather");

describe("FormSearchCity", () => {
  beforeEach(() => {
    (useWeather as jest.Mock).mockReturnValue({
      cityName: "",
      setCityName: jest.fn(),
      handleSubmit: jest.fn((e) => e.preventDefault()),
      weatherInfo: {},
      handleCitySelect: jest.fn(),
    });
  });

  it("renders the heading", () => {
    render(<FormSearchCity />);
    const heading = screen.getByRole("heading", { name: /search for city/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the input field", () => {
    render(<FormSearchCity />);
    const input = screen.getByPlaceholderText(/write the name of the city/i);
    expect(input).toBeInTheDocument();
  });

  it("updates the input field value on change", () => {
    const setCityName = jest.fn();
    (useWeather as jest.Mock).mockReturnValueOnce({
      cityName: "",
      setCityName,
      handleSubmit: jest.fn((e) => e.preventDefault()),
      weatherInfo: {},
      handleCitySelect: jest.fn(),
    });

    render(<FormSearchCity />);
    const input = screen.getByPlaceholderText(/write the name of the city/i);
    fireEvent.change(input, { target: { value: "New York" } });
    expect(setCityName).toHaveBeenCalledWith("New York");
  });

  it("calls handleSubmit on form submit", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    (useWeather as jest.Mock).mockReturnValueOnce({
      cityName: "New York",
      setCityName: jest.fn(),
      handleSubmit,
      weatherInfo: {},
      handleCitySelect: jest.fn(),
    });

    render(<FormSearchCity />);
    const input = screen.getByPlaceholderText(/write the name of the city/i);
    fireEvent.change(input, { target: { value: "New York" } });

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("renders the submit button only when cityName is not empty", () => {
    const { rerender } = render(<FormSearchCity />);
    let button = screen.queryByRole("button", { name: /search/i });
    expect(button).not.toBeInTheDocument();

    (useWeather as jest.Mock).mockReturnValueOnce({
      cityName: "New York",
      setCityName: jest.fn(),
      handleSubmit: jest.fn(),
      weatherInfo: {},
      handleCitySelect: jest.fn(),
    });

    rerender(<FormSearchCity />);
    button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeInTheDocument();
  });
});
