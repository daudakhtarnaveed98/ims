"use client";

import React, { useEffect } from "react";
import CategoryCard from "@/app/dashboard/categories/category-card";
import {
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { getCategories } from "@/app/dashboard/categories/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setCategories,
  setIsFetchingCategory,
} from "@/app/dashboard/categories/categories-slice";
import Box from "@mui/material/Box";

export default function Categories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const isFetchingCategory = useAppSelector(
    (state) => state.categoriesReducer.isFetchingCategory,
  );
  const refetchCategories = useAppSelector(
    (state) => state.categoriesReducer.refetchCategories,
  );

  useEffect(() => {
    try {
      const getCategoriesAsync = async () => {
        const categories = await getCategories();
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

  return (
    <>
      <Typography
        sx={{ mb: 1, textAlign: "center" }}
        variant="h4"
        component="div"
      >
        Categories
      </Typography>
      <Divider />
      {isFetchingCategory ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      ) : categories.length > 0 ? (
        <List>
          {categories.map((category) => (
            <ListItem key={category.id}>
              <CategoryCard id={category.id} name={category.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Alert
          severity="warning"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          No categories found.
        </Alert>
      )}
    </>
  );
}
