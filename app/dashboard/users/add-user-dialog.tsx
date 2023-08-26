import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { List, ListItem, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import {
  setIsAddingUser,
  setIsAddUserDialogOpen,
  setRefetchUsers,
} from "@/app/dashboard/users/users-slice";
import * as yup from "yup";
import { User } from "@/app/dashboard/users/types";
import { addUser } from "@/app/dashboard/users/utils";
// @ts-ignore
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;

export default function AddUserDialog() {
  const dispatch = useAppDispatch();
  const isAddUserDialogOpen = useAppSelector(
    (state) => state.usersReducer.isAddUserDialogOpen,
  );
  const isAddingUser = useAppSelector(
    (state) => state.usersReducer.isAddingUser,
  );
  const refetchUsers = useAppSelector(
    (state) => state.usersReducer.refetchUsers,
  );
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      uid: "",
      id: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      role: yup.string().required("Please select a role"),
    }),
    onSubmit: async (values: User) => {
      try {
        enqueueSnackbar("User is being added!", { variant: "info" });

        dispatch(setIsAddingUser(true));

        await addUser(values);

        dispatch(setIsAddingUser(false));
        dispatch(setIsAddUserDialogOpen(false));
        dispatch(setRefetchUsers(!refetchUsers));
        formik.resetForm();

        enqueueSnackbar("User added successfully!", { variant: "success" });
        enqueueSnackbar("Please verify your email!", { variant: "info" });
      } catch (e: FirebaseError) {
        console.error(e);

        dispatch(setIsAddingUser(false));
        dispatch(setIsAddUserDialogOpen(false));
        formik.resetForm();

        const { code } = e;

        if (code === "auth/email-already-in-use") {
          enqueueSnackbar({
            message: "This email is already in use!",
            variant: "error",
          });

          return;
        }

        enqueueSnackbar("An error occurred while adding user!", {
          variant: "error",
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(setIsAddUserDialogOpen(false));
  };

  return (
    <form id="addUserForm" onSubmit={formik.handleSubmit}>
      <Dialog open={isAddUserDialogOpen} onClose={handleClose}>
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="text"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="text"
                size="small"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                id="role"
                name="role"
                select
                label="Role"
                size="small"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                fullWidth
              >
                <MenuItem key={"OWNER"} value={"OWNER"}>
                  OWNER
                </MenuItem>
                <MenuItem key={"MANAGER"} value={"MANAGER"}>
                  MANAGER
                </MenuItem>
              </TextField>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            size="small"
            color="error"
          >
            Close
          </Button>
          <Button
            variant="contained"
            size="small"
            type="submit"
            form="addUserForm"
            disabled={isAddingUser}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
