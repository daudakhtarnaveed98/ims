import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsEditingProduct,
  setIsEditProductDialogOpen,
  setRefetchProducts,
  setToEditProduct,
} from "@/app/dashboard/products/products-slice";
import { List, ListItem, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { useCategories } from "@/app/dashboard/categories/hooks";
import { useSnackbar } from "notistack";
import { editProduct } from "@/app/dashboard/products/utils";
import { DateTime } from "luxon";

export default function EditProductDialog() {
  useCategories();
  const dispatch = useAppDispatch();
  const isEditProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isEditProductDialogOpen,
  );
  const toEditProduct = useAppSelector(
    (state) => state.productsReducer.toEditProduct,
  );
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const refetchProducts = useAppSelector(
    (state) => state.productsReducer.refetchProducts,
  );
  const isEditingProduct = useAppSelector(
    (state) => state.productsReducer.isEditingProduct,
  );
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: toEditProduct.name,
      expiry: toEditProduct.expiry,
      category: toEditProduct.category,
      oldStock: toEditProduct.stock,
      newStock: 0,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      expiry: toEditProduct.isExpiryMandatory
        ? yup
            .string()
            .matches(new RegExp("(0[1-9]|10|11|12)/[0-9]{4}"), {
              message: "Expiry should be in MM/YYYY format",
            })
            .required("Expiry is required")
        : yup.string().matches(new RegExp("(0[1-9]|10|11|12)/[0-9]{4}"), {
            message: "Expiry should be in MM/YYYY format",
          }),
      category: yup.string().required("Category is required"),
      oldStock: yup.number().required("Old stock is required"),
      newStock: yup
        .number()
        .min(0, "New stock quantity must be greater than or equal to 0")
        .required("New stock is required"),
    }),
    onSubmit: async (values) => {
      const update = {
        ...toEditProduct,
        name: values.name,
        category: values.category,
        expiry: values.expiry,
        stock: values.oldStock + values.newStock,
        modifiedOn: DateTime.now().toFormat("dd/MM/yyyy"),
      };

      try {
        enqueueSnackbar("Product is being edited!", { variant: "info" });

        dispatch(setIsEditingProduct(true));

        if (toEditProduct.id != null) {
          await editProduct(toEditProduct.id, update);
        }

        dispatch(setIsEditingProduct(false));
        dispatch(setIsEditProductDialogOpen(false));
        dispatch(setRefetchProducts(!refetchProducts));
        formik.resetForm();

        enqueueSnackbar("Product edited successfully!", { variant: "success" });
      } catch (e) {
        console.error(e);

        dispatch(setIsEditingProduct(false));
        dispatch(setIsEditProductDialogOpen(false));
        formik.resetForm();

        enqueueSnackbar("An error occurred while editing product!", {
          variant: "error",
        });
      }
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(
      setToEditProduct({
        id: "",
        name: "",
        category: "",
        expiry: "",
        stock: 0,
        lowStockQuantity: 0,
        modifiedOn: "",
      }),
    );
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
              <InputMask
                mask={"99/9999"}
                value={formik.values.expiry}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {/*@ts-ignore*/}
                {() => (
                  <TextField
                    id="expiry"
                    name="expiry"
                    label="Expiry"
                    type="text"
                    size="small"
                    error={
                      formik.touched.expiry && Boolean(formik.errors.expiry)
                    }
                    helperText={formik.touched.expiry && formik.errors.expiry}
                    placeholder="MM/YYYY"
                    fullWidth
                  />
                )}
              </InputMask>
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
                {categories.map(
                  (category) =>
                    category.name !== "All" &&
                    category.name !== "Expires soon" &&
                    category.name !== "Low stock" && (
                      <MenuItem key={category.name} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ),
                )}
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
            disabled={isEditingProduct}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
