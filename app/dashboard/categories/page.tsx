"use client";

import React from "react";
import CategoryCard from "@/app/dashboard/categories/category-card";
import {
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import Box from "@mui/material/Box";
import { useCategories } from "@/app/dashboard/categories/hooks";

export default function Categories() {
  useCategories();
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const isFetchingCategory = useAppSelector(
    (state) => state.categoriesReducer.isFetchingCategory,
  );

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
        <List sx={{ mb: 8 }}>
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
