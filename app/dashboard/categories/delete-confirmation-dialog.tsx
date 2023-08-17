"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsConfirmDialogOpen,
  setIsDeletingCategory,
  setRefetchCategories,
  setToDeleteCategoryId,
} from "@/app/dashboard/categories/categories-slice";
import { deleteCategory } from "@/app/dashboard/categories/utils";

export default function DeleteConfirmationDialog() {
  const dispatch = useAppDispatch();
  const isConfirmDialogOpen = useAppSelector(
    (state) => state.categoriesReducer.isConfirmDialogOpen,
  );
  const toDeleteCategoryId = useAppSelector(
    (state) => state.categoriesReducer.toDeleteCategoryId,
  );
  const isDeletingCategory = useAppSelector(
    (state) => state.categoriesReducer.isDeletingCategory,
  );
  const refetchCategories = useAppSelector(
    (state) => state.categoriesReducer.refetchCategories,
  );

  const handleClose = () => {
    dispatch(setToDeleteCategoryId(""));
    dispatch(setIsConfirmDialogOpen(false));
  };

  const handleDelete = async () => {
    try {
      dispatch(setIsDeletingCategory(true));

      await deleteCategory(toDeleteCategoryId);

      dispatch(setIsDeletingCategory(false));
      dispatch(setIsConfirmDialogOpen(false));
      dispatch(setRefetchCategories(!refetchCategories));
    } catch (e) {
      console.error(e);

      dispatch(setIsDeletingCategory(false));
      dispatch(setIsConfirmDialogOpen(false));
    }
  };

  return (
    <Dialog open={isConfirmDialogOpen} onClose={handleClose}>
      <DialogTitle id="delete-confirmation">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please press DELETE to remove this category.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          size="small"
        >
          Close
        </Button>
        <Button
          onClick={handleDelete}
          autoFocus
          variant="contained"
          size="small"
          disabled={isDeletingCategory}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
