import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsEditProductDialogOpen } from "@/app/dashboard/products/products-slice";
import { List, ListItem, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

export default function EditProductDialog() {
  const dispatch = useAppDispatch();
  const isEditProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isEditProductDialogOpen,
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      category: "",
      oldStock: "",
      newStock: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      expiry: yup.string().required("Expiry is required"),
      category: yup.string().required("Category is required"),
      oldStock: yup.number().required("Old stock is required"),
      newStock: yup.number().required("New stock is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(setIsEditProductDialogOpen(false));
  };

  return (
    <form id="editProductForm" onSubmit={formik.handleSubmit}>
      <Dialog open={isEditProductDialogOpen} onClose={handleClose}>
        <DialogTitle>Edit product</DialogTitle>
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
            <ListItem>
              <TextField
                id="oldStock"
                name="oldStock"
                label="Old stock"
                type="number"
                size="small"
                value={formik.values.oldStock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.oldStock && Boolean(formik.errors.oldStock)
                }
                helperText={formik.touched.oldStock && formik.errors.oldStock}
                fullWidth
                disabled
              />
            </ListItem>
            <ListItem>
              <TextField
                id="newStock"
                name="newStock"
                label="New stock"
                type="number"
                size="small"
                value={formik.values.newStock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newStock && Boolean(formik.errors.newStock)
                }
                helperText={formik.touched.newStock && formik.errors.newStock}
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
            form="editProductForm"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
