import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getProducts } from "@/app/dashboard/products/utils";
import {
  setIsFetchingProducts,
  setProducts,
  setSearchQuery,
} from "@/app/dashboard/products/products-slice";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const refetchProducts = useAppSelector(
    (state) => state.productsReducer.refetchProducts,
  );
  const searchQuery = useAppSelector(
    (state) => state.productsReducer.searchQuery,
  );

  useEffect(() => {
    try {
      const getProductsAsync = async () => {
        const products = await getProducts();

        const results = products
          .map((product) => {
            if (product.name.includes(searchQuery)) {
              return product;
            } else {
              return null;
            }
          })
          .filter(notEmpty);

        dispatch(setProducts(results));
      };

      dispatch(setIsFetchingProducts(true));

      getProductsAsync()
        .then(() => dispatch(setIsFetchingProducts(false)))
        .catch(console.error);
    } catch (e) {
      console.error(e);

      dispatch(setIsFetchingProducts(false));
    }
  }, [dispatch, refetchProducts, searchQuery]);
};
