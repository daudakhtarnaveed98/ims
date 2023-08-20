import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsConsumeProductDialogOpen,
  setIsConsumingProduct,
  setRefetchProducts,
  setToConsumeProduct,
} from "@/app/dashboard/products/products-slice";
import { List, ListItem, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { DateTime } from "luxon";
import { useSnackbar } from "notistack";
import { consumeProduct } from "@/app/dashboard/products/utils";

export default function ConsumeProductDialog() {
  const dispatch = useAppDispatch();
  const isConsumeProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isConsumeProductDialogOpen,
  );
  const refetchProducts = useAppSelector(
    (state) => state.productsReducer.refetchProducts,
  );
  const isConsumingProduct = useAppSelector(
    (state) => state.productsReducer.isConsumingProduct,
  );
  const toConsumeProduct = useAppSelector(
    (state) => state.productsReducer.toConsumeProduct,
  );
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: toConsumeProduct.name,
      category: toConsumeProduct.category,
      stock: toConsumeProduct.stock,
      quantity: 0,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      category: yup.string().required("Category is required"),
      quantity: yup
        .number()
        .min(1, "Quantity must be greater than 0")
        .max(
          toConsumeProduct.stock,
          "Quantity cannot be greater than available stock",
        )
        .required("Quantity is required"),
    }),
    onSubmit: async (values) => {
      const update = {
        ...toConsumeProduct,
        stock: toConsumeProduct.stock - values.quantity,
        modifiedOn: DateTime.now().toFormat("dd/MM/yyyy"),
      };

      try {
        enqueueSnackbar("Product is being consumed!", { variant: "info" });

        dispatch(setIsConsumingProduct(true));

        if (toConsumeProduct.id != null) {
          await consumeProduct(toConsumeProduct.id, update);
        }

        dispatch(setIsConsumingProduct(false));
        dispatch(setIsConsumeProductDialogOpen(false));
        dispatch(setRefetchProducts(!refetchProducts));
        formik.resetForm();

        enqueueSnackbar("Product consumed successfully!", {
          variant: "success",
        });
      } catch (e) {
        console.error(e);

        dispatch(setIsConsumeProductDialogOpen(false));
        dispatch(setRefetchProducts(!refetchProducts));
        formik.resetForm();

        enqueueSnackbar("An error occurred while consuming product!", {
          variant: "error",
        });
      }
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(
      setToConsumeProduct({
        id: "",
        name: "",
        category: "",
        expiry: "",
        stock: 0,
        lowStockQuantity: 0,
        modifiedOn: "",
      }),
    );
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
                {categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
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
                disabled
              />
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
            disabled={isConsumingProduct}
          >
            Consume
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
