import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsAddProductDialogOpen } from "@/app/dashboard/products/products-slice";
import { List, ListItem, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

export default function AddProductDialog() {
  const dispatch = useAppDispatch();
  const isAddProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isAddProductDialogOpen,
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      stock: "",
      expiry: "",
      category: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      stock: yup.number().required("Stock is required"),
      expiry: yup.string().required("Expiry is required"),
      category: yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(setIsAddProductDialogOpen(false));
  };

  return (
    <form id="addProductForm" onSubmit={formik.handleSubmit}>
      <Dialog open={isAddProductDialogOpen} onClose={handleClose}>
        <DialogTitle>Add product</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <TextField
                id="name"
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
            <ListItem>
              <TextField
                id="stock"
                name="stock"
                label="Stock"
                type="number"
                size="small"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                id="expiry"
                name="expiry"
                label="Expiry"
                type="text"
                size="small"
                value={formik.values.expiry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.expiry && Boolean(formik.errors.expiry)}
                helperText={formik.touched.expiry && formik.errors.expiry}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <TextField
                id="category"
                name="category"
                select
                label="Category"
                size="small"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
                fullWidth
              >
                <MenuItem key="injections" value="injections">
                  Injections
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
            form="addProductForm"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
