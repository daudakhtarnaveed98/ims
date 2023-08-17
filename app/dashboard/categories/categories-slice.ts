import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState, Category } from "@/app/dashboard/categories/types";

const initialState = {
  isConfirmDialogOpen: false,
  isAddCategoryDialogOpen: false,
  isAddingCategory: false,
  isFetchingCategory: false,
  isDeletingCategory: false,
  toDeleteCategoryId: "",
  categories: [],
  refetchCategories: false,
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
    setIsAddingCategory: (state, action: PayloadAction<boolean>) => {
      state.isAddingCategory = action.payload;
    },
    setIsFetchingCategory: (state, action: PayloadAction<boolean>) => {
      state.isFetchingCategory = action.payload;
    },
    setIsDeletingCategory: (state, action: PayloadAction<boolean>) => {
      state.isDeletingCategory = action.payload;
    },
    setToDeleteCategoryId: (state, action: PayloadAction<string>) => {
      state.toDeleteCategoryId = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setRefetchCategories: (state, action: PayloadAction<boolean>) => {
      state.refetchCategories = action.payload;
    },
  },
});

export const {
  reset,
  setIsConfirmDialogOpen,
  setIsAddCategoryDialogOpen,
  setIsAddingCategory,
  setIsFetchingCategory,
  setIsDeletingCategory,
  setToDeleteCategoryId,
  setCategories,
  setRefetchCategories,
} = categories.actions;
export default categories.reducer;
