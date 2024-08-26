import { useWeather } from "../hooks/useWeather";
import { AnimatePresence, motion } from "framer-motion";
import Error from "./Error";

const FormSearchCity = () => {
  const { cityName, setCityName, handleSubmit, weatherInfo } = useWeather();

  return (
    <>
      <h1 className="text-4xl font-bold text-white mt-6 mb-4">
        Search for city
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 text-white rounded mt-2"
      >
        <input
          type="text"
          id="search-city"
          name="buscar-ciudad"
          placeholder="Write the name of the city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className="border p-2 text-blue-950 text-center"
          maxLength={30}
        />
        <AnimatePresence>
          {cityName.length > 0 && (
            <motion.button
              type="submit"
              className="bg-slate-800 border-white border px-4 py-2 text-white rounded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              Search
            </motion.button>
          )}
        </AnimatePresence>
      </form>
      {weatherInfo.error && <Error error={weatherInfo.error} />}
    </>
  );
};

export default FormSearchCity;
