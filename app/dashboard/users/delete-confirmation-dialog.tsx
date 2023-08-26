"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSnackbar } from "notistack";
import {
  setIsConfirmDialogOpen,
  setIsDeletingUser,
  setRefetchUsers,
  setToDeleteUser,
} from "@/app/dashboard/users/users-slice";
import { deleteUser } from "@/app/dashboard/users/utils";

export default function DeleteConfirmationDialog() {
  const dispatch = useAppDispatch();
  const isConfirmDialogOpen = useAppSelector(
    (state) => state.usersReducer.isConfirmDialogOpen,
  );
  const toDeleteUser = useAppSelector(
    (state) => state.usersReducer.toDeleteUser,
  );
  const isDeletingUser = useAppSelector(
    (state) => state.usersReducer.isDeletingUser,
  );
  const refetchUsers = useAppSelector(
    (state) => state.usersReducer.refetchUsers,
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    dispatch(
      setToDeleteUser({
        email: "",
        id: "",
        role: "",
        uid: "",
      }),
    );
    dispatch(setIsConfirmDialogOpen(false));
  };

  const handleDelete = async () => {
    try {
      enqueueSnackbar("User is being deleted!", { variant: "info" });

      dispatch(setIsDeletingUser(true));

      await deleteUser(toDeleteUser.id, toDeleteUser.uid);

      dispatch(setIsDeletingUser(false));
      dispatch(setIsConfirmDialogOpen(false));
      dispatch(setRefetchUsers(!refetchUsers));

      enqueueSnackbar("User deleted successfully!", { variant: "success" });
    } catch (e) {
      console.error(e);

      dispatch(setIsDeletingUser(false));
      dispatch(setIsConfirmDialogOpen(false));

      enqueueSnackbar("An error occurred while deleting user!", {
        variant: "error",
      });
    }
  };

  return (
    <Dialog open={isConfirmDialogOpen} onClose={handleClose}>
      <DialogTitle id="delete-confirmation">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please press DELETE to remove this user.
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
          disabled={isDeletingUser}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
