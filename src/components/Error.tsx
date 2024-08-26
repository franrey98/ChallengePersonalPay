import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../store/weather/weather.slice";

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(actions.clearError());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className="error-message mt-6 bg-red-700 flex content-center border rounded-lg p-4">
      {error}
    </div>
  );
};

export default Error;
