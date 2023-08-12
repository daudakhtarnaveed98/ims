import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BottomNavigationState = {
  value: number;
};

const initialState = {
  value: 0,
} as BottomNavigationState;

export const bottomNavigation = createSlice({
  name: "bottomNavigation",
  initialState,
  reducers: {
    reset: () => initialState,
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { reset, setValue } = bottomNavigation.actions;
export default bottomNavigation.reducer;
