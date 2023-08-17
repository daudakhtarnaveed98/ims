export interface Category {
  id?: string;
  name: string;
}

export interface CategoriesState {
  isConfirmDialogOpen: boolean;
  isAddCategoryDialogOpen: boolean;
  isAddingCategory: boolean;
  isFetchingCategory: boolean;
  isDeletingCategory: boolean;
  toDeleteCategoryId: string;
  categories: Category[];
  refetchCategories: boolean;
}
