import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsAddingProduct,
  setIsAddProductDialogOpen,
  setRefetchProducts,
} from "@/app/dashboard/products/products-slice";
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { DateTime } from "luxon";
import { useSnackbar } from "notistack";
import { addProduct } from "@/app/dashboard/products/utils";
import { Product } from "@/app/dashboard/products/types";
import { useCategories } from "@/app/dashboard/categories/hooks";
import InputMask from "react-input-mask";
import { addProductAddLog } from "@/app/dashboard/logs/utils";
import { setRefetchLogs } from "@/app/dashboard/logs/logs-slice";

export default function AddProductDialog() {
  useCategories();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.userReducer.user);
  const isAddProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isAddProductDialogOpen,
  );
  const refetchProducts = useAppSelector(
    (state) => state.productsReducer.refetchProducts,
  );
  const refetchLogs = useAppSelector((state) => state.logsReducer.refetchLogs);
  const { enqueueSnackbar } = useSnackbar();
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );
  const isAddingProducts = useAppSelector(
    (state) => state.productsReducer.isAddingProduct,
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      stock: 0,
      lowStockQuantity: 0,
      expiry: "",
      category: "",
      modifiedOn: "",
      isExpiryMandatory: false,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      stock: yup
        .number()
        .min(1, "Stock must be greater than 0")
        .required("Stock is required"),
      lowStockQuantity: yup
        .number()
        .min(1, "Low stock quantity must be greater than 0")
        .required("Low stock quantity is required"),
      expiry: yup.string().matches(new RegExp("(0[1-9]|10|11|12)/[0-9]{4}"), {
        message: "Expiry should be in MM/YYYY format",
      }),
      category: yup.string().required("Category is required"),
      isExpiryMandatory: yup.boolean(),
    }),
    onSubmit: async (values: Product) => {
      values["modifiedOn"] = DateTime.now().toFormat("dd/MM/yyyy");

      try {
        enqueueSnackbar("Product is being added!", { variant: "info" });

        dispatch(setIsAddingProduct(true));

        await addProduct(values);

        dispatch(setIsAddingProduct(false));
        dispatch(setIsAddProductDialogOpen(false));
        dispatch(setRefetchProducts(!refetchProducts));
        formik.resetForm();

        enqueueSnackbar("Product added successfully!", { variant: "success" });

        await addProductAddLog(email, values.name, values.stock);
        dispatch(setRefetchLogs(!refetchLogs));
      } catch (e) {
        console.error(e);

        dispatch(setIsAddingProduct(false));
        dispatch(setIsAddProductDialogOpen(false));
        formik.resetForm();

        enqueueSnackbar("An error occurred while adding product!", {
          variant: "error",
        });
      }
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
                id="lowStockQuantity"
                name="lowStockQuantity"
                label="Low stock quantity"
                type="number"
                size="small"
                value={formik.values.lowStockQuantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lowStockQuantity &&
                  Boolean(formik.errors.lowStockQuantity)
                }
                helperText={
                  formik.touched.lowStockQuantity &&
                  formik.errors.lowStockQuantity
                }
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
              <FormControlLabel
                id="isExpiryMandatory"
                name="isExpiryMandatory"
                control={
                  <Checkbox
                    id="isExpiryMandatory"
                    name="isExpiryMandatory"
                    value={formik.values.isExpiryMandatory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
                label="Is expiry mandatory"
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
            form="addProductForm"
            disabled={isAddingProducts}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
