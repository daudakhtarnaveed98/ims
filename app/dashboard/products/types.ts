export interface Product {
  id?: string;
  name: string;
  category: string;
  stock: number;
  expiry: string;
  modifiedOn: string;
  lowStockQuantity: number;
}

export interface ProductsState {
  isConfirmDialogOpen: boolean;
  isAddProductDialogOpen: boolean;
  isConsumeProductDialogOpen: boolean;
  isEditProductDialogOpen: boolean;
  isAddingProduct: boolean;
  isFetchingProduct: boolean;
  isFetchingProducts: boolean;
  isDeletingProduct: boolean;
  isEditingProduct: boolean;
  isConsumingProduct: boolean;
  toFetchProductId: string;
  toEditProduct: Product;
  toConsumeProduct: Product;
  toDeleteProductId: string;
  products: Product[];
  refetchProducts: boolean;
  searchQuery: string;
  selectedCategory: string;
}
