"use client";

import React from "react";
import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsConfirmDialogOpen,
  setToDeleteCategoryId,
} from "@/app/dashboard/categories/categories-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Category } from "@/app/dashboard/categories/types";
import { UNDELETABLE_CATEGORIES } from "@/app/dashboard/categories/constants";

export default function CategoryCard({ id, name }: Category) {
  const dispatch = useAppDispatch();
  const isDeletingCategory = useAppSelector(
    (state) => state.categoriesReducer.isDeletingCategory,
  );

  const isDisabled = () => {
    for (const unDeletableCategory of UNDELETABLE_CATEGORIES) {
      if (unDeletableCategory.id === id) {
        return true;
      }
    }
    return false;
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="error"
          onClick={() => {
            if (id != null) {
              dispatch(setToDeleteCategoryId(id));
              dispatch(setIsConfirmDialogOpen(true));
            }
          }}
          disabled={isDisabled() || isDeletingCategory}
        >
          <DeleteIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
