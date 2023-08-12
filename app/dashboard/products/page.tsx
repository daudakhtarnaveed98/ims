"use client";

import React from "react";
import { Divider, List, ListItem, Typography } from "@mui/material";
import ProductCard from "@/app/dashboard/products/product-card";

export default function Products() {
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
      <List>
        <ListItem>
          <ProductCard
            name="Aspirin"
            category="Tablets"
            quantity={100}
            expiry="10/2023"
          />
        </ListItem>
        <ListItem>
          <ProductCard
            name="Aspirin"
            category="Tablets"
            quantity={100}
            expiry="10/2023"
          />
        </ListItem>
      </List>
    </>
  );
}
