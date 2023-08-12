import { configureStore } from "@reduxjs/toolkit";
import bottomNavigationReducer from "@/app/dashboard/bottom-navigation-slice";

export const store = configureStore({
  reducer: {
    bottomNavigationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
