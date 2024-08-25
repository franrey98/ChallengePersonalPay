import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { weatherActions, weathersReducer } from "./weather";

export const actions = {
  weathers: weatherActions,
};

const reducers = {
  weathers: weathersReducer,
};

export const store = configureStore({
  reducer: reducers,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
