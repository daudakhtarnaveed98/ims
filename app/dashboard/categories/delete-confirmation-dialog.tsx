"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsConfirmDialogOpen } from "@/app/dashboard/categories/categories-slice";

export default function DeleteConfirmationDialog() {
  const dispatch = useAppDispatch();
  const isConfirmDialogOpen = useAppSelector(
    (state) => state.categoriesReducer.isConfirmDialogOpen,
  );

  const handleClose = () => {
    dispatch(setIsConfirmDialogOpen(false));
  };

  const handleConfirm = () => {};

  return (
    <Dialog open={isConfirmDialogOpen} onClose={handleClose}>
      <DialogTitle id="delete-confirmation">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please confirm if you want to proceed with this delete operation.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Close
        </Button>
        <Button
          onClick={handleConfirm}
          autoFocus
          variant="contained"
          color="success"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
