import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductsState = {
  isConfirmDialogOpen: boolean;
};

const initialState = {
  isConfirmDialogOpen: false,
} as ProductsState;

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsConfirmDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmDialogOpen = action.payload;
    },
  },
});

export const { reset, setIsConfirmDialogOpen } = products.actions;
export default products.reducer;
