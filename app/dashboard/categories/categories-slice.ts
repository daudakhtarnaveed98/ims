import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CategoriesState = {
  isConfirmDialogOpen: boolean;
  isAddCategoryDialogOpen: boolean;
};

const initialState = {
  isConfirmDialogOpen: false,
  isAddCategoryDialogOpen: false,
} as CategoriesState;

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsConfirmDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmDialogOpen = action.payload;
    },
    setIsAddCategoryDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddCategoryDialogOpen = action.payload;
    },
  },
});

export const { reset, setIsConfirmDialogOpen, setIsAddCategoryDialogOpen } =
  categories.actions;
export default categories.reducer;
