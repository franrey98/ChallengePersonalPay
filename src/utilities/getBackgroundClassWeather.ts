export const getBackgroundClassWeather = (weatherMain: string) => {
  switch (weatherMain) {
    case "Clear":
      return "bg-gradient-to-r from-blue-500 to-yellow-200";
    case "Clouds":
      return "bg-gradient-to-r from-gray-400 to-gray-200";
    case "Rain":
      return "bg-gradient-to-r from-blue-800 to-gray-400";
    case "Snow":
      return "bg-gradient-to-r from-blue-200 to-white";
    default:
      return "bg-gradient-to-r from-gray-300 to-gray-100";
  }
};
