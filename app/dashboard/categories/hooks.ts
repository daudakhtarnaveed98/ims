import { useEffect } from "react";
import { getCategories } from "@/app/dashboard/categories/utils";
import {
  setCategories,
  setIsFetchingCategory,
} from "@/app/dashboard/categories/categories-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const refetchCategories = useAppSelector(
    (state) => state.categoriesReducer.refetchCategories,
  );

  useEffect(() => {
    dispatch(setCategories([]));

    try {
      const getCategoriesAsync = async () => {
        const categories = await getCategories();
        categories.push({ name: "Unassigned", id: "unassigned" });
        dispatch(setCategories(categories));
      };

      dispatch(setIsFetchingCategory(true));

      getCategoriesAsync()
        .then(() => dispatch(setIsFetchingCategory(false)))
        .catch(console.error);
    } catch (e) {
      console.error(e);

      dispatch(setIsFetchingCategory(false));
    }
  }, [dispatch, refetchCategories]);
};
