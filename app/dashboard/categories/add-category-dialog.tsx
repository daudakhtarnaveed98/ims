import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsAddCategoryDialogOpen,
  setIsAddingCategory,
  setRefetchCategories,
} from "@/app/dashboard/categories/categories-slice";
import { List, ListItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { addCategory } from "@/app/dashboard/categories/utils";
import { useSnackbar } from "notistack";
import { Category } from "@/app/dashboard/categories/types";

export default function AddCategoryDialog() {
  const dispatch = useAppDispatch();
  const isAddCategoryDialogOpen = useAppSelector(
    (state) => state.categoriesReducer.isAddCategoryDialogOpen,
  );
  const isAddingCategory = useAppSelector(
    (state) => state.categoriesReducer.isAddingCategory,
  );
  const refetchCategories = useAppSelector(
    (state) => state.categoriesReducer.refetchCategories,
  );
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
    }),
    onSubmit: async (values: Category) => {
      try {
        enqueueSnackbar("Category is being added!", { variant: "info" });

        dispatch(setIsAddingCategory(true));

        await addCategory(values);

        dispatch(setIsAddingCategory(false));
        dispatch(setIsAddCategoryDialogOpen(false));
        dispatch(setRefetchCategories(!refetchCategories));
        formik.resetForm();

        enqueueSnackbar("Category added successfully!", { variant: "success" });
      } catch (e) {
        console.error(e);

        dispatch(setIsAddingCategory(false));
        dispatch(setIsAddCategoryDialogOpen(false));
        formik.resetForm();

        enqueueSnackbar("An error occurred while adding category!", {
          variant: "error",
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(setIsAddCategoryDialogOpen(false));
  };

  return (
    <form id="addCategoryForm" onSubmit={formik.handleSubmit}>
      <Dialog open={isAddCategoryDialogOpen} onClose={handleClose}>
        <DialogTitle>Add new category</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <TextField
                id="categoryName"
                name="name"
                label="Name"
                type="text"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
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
            form="addCategoryForm"
            disabled={isAddingCategory}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
