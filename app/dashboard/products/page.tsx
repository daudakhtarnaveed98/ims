"use client";

import React from "react";
import {
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ProductCard from "@/app/dashboard/products/product-card";
import { useProducts } from "@/app/dashboard/products/hooks";
import { useAppSelector } from "@/redux/hooks";
import Box from "@mui/material/Box";
import SearchForm from "@/app/dashboard/products/search-form";

export default function Products() {
  useProducts();
  const products = useAppSelector((state) => state.productsReducer.products);
  const isFetchingProducts = useAppSelector(
    (state) => state.productsReducer.isFetchingProducts,
  );

  return (
    <>
      <Typography
        sx={{ mb: 1, textAlign: "center" }}
        variant="h4"
        component="div"
      >
        Products
      </Typography>
      <Divider />
      <SearchForm />
      <Divider />
      {isFetchingProducts ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      ) : products.length > 0 ? (
        <List sx={{ mb: 8 }}>
          {products.map((product) => (
            <ListItem key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                category={product.category}
                stock={product.stock}
                expiry={product.expiry}
                modifiedOn={product.modifiedOn}
                lowStockQuantity={product.lowStockQuantity}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Alert
          severity="warning"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          No products found.
        </Alert>
      )}
    </>
  );
}
