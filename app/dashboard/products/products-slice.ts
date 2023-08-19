import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState } from "@/app/dashboard/products/types";

const initialState = {
  isConfirmDialogOpen: false,
  isAddProductDialogOpen: false,
  isConsumeProductDialogOpen: false,
  isEditProductDialogOpen: false,
  isAddingProduct: false,
  isFetchingProduct: false,
  isEditingProduct: false,
  isDeletingProduct: false,
  isConsumingProduct: false,
  isFetchingProducts: false,
  toEditProduct: {
    id: "",
    name: "",
    expiry: "",
    stock: 0,
    lowStockQuantity: 0,
    modifiedOn: "",
    category: "",
  },
  toConsumeProduct: {
    id: "",
    name: "",
    expiry: "",
    stock: 0,
    lowStockQuantity: 0,
    modifiedOn: "",
    category: "",
  },
  toFetchProductId: "",
  toDeleteProductId: "",
  products: [],
  refetchProducts: false,
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
    setIsAddingProduct: (state, action: PayloadAction<boolean>) => {
      state.isAddingProduct = action.payload;
    },
    setIsFetchingProduct: (state, action: PayloadAction<boolean>) => {
      state.isFetchingProduct = action.payload;
    },
    setIsEditingProduct: (state, action: PayloadAction<boolean>) => {
      state.isEditingProduct = action.payload;
    },
    setIsDeletingProduct: (state, action: PayloadAction<boolean>) => {
      state.isDeletingProduct = action.payload;
    },
    setIsConsumingProduct: (state, action: PayloadAction<boolean>) => {
      state.isConsumingProduct = action.payload;
    },
    setIsFetchingProducts: (state, action: PayloadAction<boolean>) => {
      state.isFetchingProducts = action.payload;
    },
    setToEditProduct: (state, action: PayloadAction<Product>) => {
      state.toEditProduct = action.payload;
    },
    setToConsumeProduct: (state, action: PayloadAction<Product>) => {
      state.toConsumeProduct = action.payload;
    },
    setToFetchProductId: (state, action: PayloadAction<string>) => {
      state.toFetchProductId = action.payload;
    },
    setToDeleteProductId: (state, action: PayloadAction<string>) => {
      state.toDeleteProductId = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setRefetchProducts: (state, action: PayloadAction<boolean>) => {
      state.refetchProducts = action.payload;
    },
  },
});

export const {
  reset,
  setIsConfirmDialogOpen,
  setIsAddProductDialogOpen,
  setIsConsumeProductDialogOpen,
  setIsEditProductDialogOpen,
  setRefetchProducts,
  setIsAddingProduct,
  setIsConsumingProduct,
  setIsDeletingProduct,
  setIsFetchingProduct,
  setIsEditingProduct,
  setToDeleteProductId,
  setToFetchProductId,
  setToEditProduct,
  setToConsumeProduct,
  setProducts,
  setIsFetchingProducts,
} = products.actions;
export default products.reducer;
