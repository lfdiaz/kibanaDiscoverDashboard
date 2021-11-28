import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import elasticReducer from "../features/Dashboard/elasticSlice";

export const store = configureStore({
  reducer: {
    elastic: elasticReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
