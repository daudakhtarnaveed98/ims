import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoriesState = {
  isConfirmDialogOpen: boolean;
};

const initialState = {
  isConfirmDialogOpen: false,
} as CategoriesState;

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsConfirmDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmDialogOpen = action.payload;
    },
  },
});

export const { reset, setIsConfirmDialogOpen } = categories.actions;
export default categories.reducer;
