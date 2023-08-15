import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductsState = {
  isConfirmDialogOpen: boolean;
  isAddProductDialogOpen: boolean;
  isConsumeProductDialogOpen: boolean;
  isEditProductDialogOpen: boolean;
};

const initialState = {
  isConfirmDialogOpen: false,
  isAddProductDialogOpen: false,
  isConsumeProductDialogOpen: false,
  isEditProductDialogOpen: false,
} as ProductsState;

export const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsConfirmDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isConfirmDialogOpen = action.payload;
    },
    setIsAddProductDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddProductDialogOpen = action.payload;
    },
    setIsConsumeProductDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isConsumeProductDialogOpen = action.payload;
    },
    setIsEditProductDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditProductDialogOpen = action.payload;
    },
  },
});

export const {
  reset,
  setIsConfirmDialogOpen,
  setIsAddProductDialogOpen,
  setIsConsumeProductDialogOpen,
  setIsEditProductDialogOpen,
} = products.actions;
export default products.reducer;
