import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getProducts } from "@/app/dashboard/products/utils";
import {
  setIsFetchingProducts,
  setProducts,
  setSearchQuery,
  setSelectedCategory,
} from "@/app/dashboard/products/products-slice";
import { DateTime } from "luxon";

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
  const selectedCategory = useAppSelector(
    (state) => state.productsReducer.selectedCategory,
  );

  useEffect(() => {
    try {
      const getProductsAsync = async () => {
        const products = await getProducts();

        const results = products
          .map((product) => {
            if (
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
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
      dispatch(setSearchQuery(""));
    }
  }, [dispatch, refetchProducts, searchQuery]);

  useEffect(() => {
    try {
      const getProductsAsync = async () => {
        const products = await getProducts();

        if (selectedCategory === "All") {
          dispatch(setProducts(products));
          return;
        }

        if (selectedCategory === "Low stock") {
          const results = products
            .map((product) => {
              if (product.stock <= product.lowStockQuantity) {
                return product;
              } else {
                return null;
              }
            })
            .filter(notEmpty);

          dispatch(setProducts(results));
          return;
        }

        if (selectedCategory === "Expires soon") {
          const results = products
            .map((product) => {
              const expiresInMonths = DateTime.fromFormat(
                product.expiry,
                "MM/yyyy",
              )
                .diff(DateTime.now(), "months")
                .toObject()["months"];

              if (expiresInMonths && expiresInMonths <= 6) {
                return product;
              } else {
                return null;
              }
            })
            .filter(notEmpty);

          dispatch(setProducts(results));
          return;
        }

        const results = products
          .map((product) => {
            if (
              product.category
                .toLowerCase()
                .includes(selectedCategory.toLowerCase())
            ) {
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
      dispatch(setSelectedCategory(""));
    }
  }, [dispatch, refetchProducts, selectedCategory]);
};
