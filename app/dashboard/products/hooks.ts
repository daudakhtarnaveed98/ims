import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getProducts } from "@/app/dashboard/products/utils";
import {
  setIsFetchingProducts,
  setProducts,
} from "@/app/dashboard/products/products-slice";

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const refetchProducts = useAppSelector(
    (state) => state.productsReducer.refetchProducts,
  );

  useEffect(() => {
    try {
      const getProductsAsync = async () => {
        const products = await getProducts();
        dispatch(setProducts(products));
      };

      dispatch(setIsFetchingProducts(true));

      getProductsAsync()
        .then(() => dispatch(setIsFetchingProducts(false)))
        .catch(console.error);
    } catch (e) {
      console.error(e);

      dispatch(setIsFetchingProducts(false));
    }
  }, [dispatch, refetchProducts]);
};
