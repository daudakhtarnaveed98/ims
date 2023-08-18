export interface Product {
  id?: string;
  name: string;
  category: string;
  stock: number;
  expiry: string;
  modifiedOn: string;
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
  isUpdatingProduct: boolean;
  isConsumingProduct: boolean;
  toFetchProductId: string;
  toUpdateProductId: string;
  toDeleteProductId: string;
  products: Product[];
  refetchProducts: boolean;
}
