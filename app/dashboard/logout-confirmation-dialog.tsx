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
import { setIsConfirmDialogOpen } from "@/app/dashboard/dashboard-slice";
import { reset } from "@/app/user-slice";
import { usePathname } from "next/navigation";
import { setValue } from "@/app/dashboard/bottom-navigation-slice";
import { signOut } from "@firebase/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/firebase";

export default function LogoutConfirmationDialog() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isConfirmDialogOpen = useAppSelector(
    (state) => state.dashboardReducer.isConfirmDialogOpen,
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    switch (pathname) {
      case "/dashboard/logs":
        dispatch(setValue(0));
        break;
      case "/dashboard/products":
        dispatch(setValue(1));
        break;
      case "/dashboard/categories":
        dispatch(setValue(2));
        break;
      case "/dashboard/users":
        dispatch(setValue(3));
        break;
    }

    dispatch(setIsConfirmDialogOpen(false));
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth(firebaseApp);

      enqueueSnackbar("Logging out!", { variant: "info" });

      dispatch(reset());
      dispatch(setIsConfirmDialogOpen(false));

      await signOut(auth);

      enqueueSnackbar("Logged out successfully!", { variant: "success" });
    } catch (e) {
      console.error(e);

      dispatch(setIsConfirmDialogOpen(false));

      enqueueSnackbar("An error occurred while logging out!", {
        variant: "error",
      });
    }
  };

  return (
    <Dialog open={isConfirmDialogOpen} onClose={handleClose}>
      <DialogTitle id="logout-confirmation">{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please press YES to logout.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          size="small"
        >
          No
        </Button>
        <Button
          onClick={handleLogout}
          autoFocus
          variant="contained"
          size="small"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
