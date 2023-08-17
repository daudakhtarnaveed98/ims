import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsConsumeProductDialogOpen } from "@/app/dashboard/products/products-slice";
import { List, ListItem, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ConsumeProductDialog() {
  const dispatch = useAppDispatch();
  const isConsumeProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isConsumeProductDialogOpen,
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      quantity: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      category: yup.string().required("Category is required"),
      quantity: yup.string().required("Quantity is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(setIsConsumeProductDialogOpen(false));
  };

  return (
    <form id="consumeProductForm" onSubmit={formik.handleSubmit}>
      <Dialog open={isConsumeProductDialogOpen} onClose={handleClose}>
        <DialogTitle>Consume product</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <TextField
                id="name"
                name="name"
                label="Name"
                type="text"
                size="small"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                disabled
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
                disabled
              >
                <MenuItem key="injections" value="injections">
                  Injections
                </MenuItem>
              </TextField>
            </ListItem>
            <ListItem>
              <TextField
                id="quantity"
                name="quantity"
                label="Quantity"
                type="number"
                size="small"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
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
            form="consumeProductForm"
          >
            Consume
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
