import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { useAppDispatch } from "@/redux/hooks";
import { setSearchQuery } from "@/app/dashboard/products/products-slice";
import CategoryFilter from "@/app/dashboard/products/category-filter";

export default function SearchForm() {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: async (values) => {
      dispatch(setSearchQuery(values.query));
    },
  });

  return (
    <form id="productSearchForm" onSubmit={formik.handleSubmit}>
      <Box sx={{ m: 2, display: "flex" }}>
        <TextField
          sx={{ mr: 1 }}
          id="query"
          name="query"
          label="Search"
          size="small"
          value={formik.values.query}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.query && Boolean(formik.errors.query)}
          helperText={formik.touched.query && formik.errors.query}
          fullWidth
        />
        <Button
          variant="contained"
          size="small"
          type="submit"
          form="productSearchForm"
        >
          Search
        </Button>
        <CategoryFilter />
      </Box>
    </form>
  );
}
