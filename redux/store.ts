import { configureStore } from "@reduxjs/toolkit";
import bottomNavigationReducer from "@/app/dashboard/bottom-navigation-slice";
import categoriesReducer from "@/app/dashboard/categories/categories-slice";
import productsReducer from "@/app/dashboard/products/products-slice";
import userReducer from "@/app/user-slice";
import usersReducer from "@/app/dashboard/users/users-slice";

export const store = configureStore({
  reducer: {
    bottomNavigationReducer,
    categoriesReducer,
    productsReducer,
    userReducer,
    usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
