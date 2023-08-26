import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import bottomNavigationReducer from "@/app/dashboard/bottom-navigation-slice";
import categoriesReducer from "@/app/dashboard/categories/categories-slice";
import productsReducer from "@/app/dashboard/products/products-slice";
import userReducer from "@/app/user-slice";
import usersReducer from "@/app/dashboard/users/users-slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    bottomNavigationReducer,
    categoriesReducer,
    productsReducer,
    userReducer: persistedUserReducer,
    usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
