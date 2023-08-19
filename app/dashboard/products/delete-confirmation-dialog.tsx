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
  setIsDeletingProduct,
  setRefetchProducts,
  setToDeleteProductId,
} from "@/app/dashboard/products/products-slice";
import { useSnackbar } from "notistack";
import { deleteProduct } from "@/app/dashboard/products/utils";

export default function DeleteConfirmationDialog() {
  const dispatch = useAppDispatch();
  const isConfirmDialogOpen = useAppSelector(
    (state) => state.productsReducer.isConfirmDialogOpen,
  );
  const toDeleteProductId = useAppSelector(
    (state) => state.productsReducer.toDeleteProductId,
  );
  const isDeletingProduct = useAppSelector(
    (state) => state.productsReducer.isDeletingProduct,
  );
  const refetchProducts = useAppSelector(
    (state) => state.productsReducer.refetchProducts,
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    dispatch(setToDeleteProductId(""));
    dispatch(setIsConfirmDialogOpen(false));
  };

  const handleDelete = async () => {
    try {
      enqueueSnackbar("Product is being deleted!", { variant: "info" });

      dispatch(setIsDeletingProduct(true));

      await deleteProduct(toDeleteProductId);

      dispatch(setIsDeletingProduct(false));
      dispatch(setIsConfirmDialogOpen(false));
      dispatch(setRefetchProducts(!refetchProducts));

      enqueueSnackbar("Product deleted successfully!", { variant: "success" });
    } catch (e) {
      console.error(e);

      dispatch(setIsDeletingProduct(false));
      dispatch(setIsConfirmDialogOpen(false));

      enqueueSnackbar("An error occurred while deleting product!", {
        variant: "error",
      });
    }
  };

  return (
    <Dialog open={isConfirmDialogOpen} onClose={handleClose}>
      <DialogTitle id="delete-confirmation">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please press DELETE if you want to remove this product.
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
          disabled={isDeletingProduct}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
