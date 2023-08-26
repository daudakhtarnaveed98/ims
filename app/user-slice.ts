"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./types";

const initialState = {
  user: {},
  isLoggingIn: false,
  isSendingVerificationEmail: false,
} as UserState;

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsLoggingIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
    setIsSendingVerificationEmail: (state, action: PayloadAction<boolean>) => {
      state.isLoggingIn = action.payload;
    },
  },
});

export const { reset, setUser, setIsLoggingIn, setIsSendingVerificationEmail } =
  user.actions;
export default user.reducer;
