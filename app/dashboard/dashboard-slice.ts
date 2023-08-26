import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isConfirmDialogOpen: false,
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsConfirmDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmDialogOpen = action.payload;
    },
  },
});

export const { reset, setIsConfirmDialogOpen } = dashboard.actions;
export default dashboard.reducer;
