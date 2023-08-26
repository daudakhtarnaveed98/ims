import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import bottomNavigationReducer from "@/app/dashboard/bottom-navigation-slice";
import categoriesReducer from "@/app/dashboard/categories/categories-slice";
import productsReducer from "@/app/dashboard/products/products-slice";
import userReducer from "@/app/user-slice";
import usersReducer from "@/app/dashboard/users/users-slice";
import dashboardReducer from "@/app/dashboard/dashboard-slice";

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
    dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
