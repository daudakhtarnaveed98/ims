"use client";

import React from "react";
import { Divider, List, ListItem, Typography } from "@mui/material";
import ProductCard from "@/app/dashboard/products/product-card";

export default function Products() {
  return (
    <>
      <Typography
        sx={{ mb: 1, textAlign: "center", position: "static" }}
        variant="h4"
        component="div"
      >
        Products
      </Typography>
      <Divider />
      <List sx={{ mb: 8 }}>
        <ListItem>
          <ProductCard
            name="Aspirin"
            category="Tablets"
            quantity={100}
            expiry="10/2023"
            modifiedOn="01/10/2023"
          />
        </ListItem>
        <ListItem>
          <ProductCard
            name="Aspirin"
            category="Tablets"
            quantity={100}
            expiry="10/2023"
            modifiedOn="01/10/2023"
          />
        </ListItem>
        <ListItem>
          <ProductCard
            name="Aspirin"
            category="Tablets"
            quantity={100}
            expiry="10/2023"
            modifiedOn="01/10/2023"
          />
        </ListItem>
        <ListItem>
          <ProductCard
            name="Aspirin"
            category="Tablets"
            quantity={100}
            expiry="10/2023"
            modifiedOn="01/10/2023"
          />
        </ListItem>
        <ListItem>
          <ProductCard
            name="Aspirin"
            category="Tablets"
            quantity={100}
            expiry="10/2023"
            modifiedOn="01/10/2023"
          />
        </ListItem>
        <ListItem>
          <ProductCard
            name="Aspirin"
            category="Tablets"
            quantity={100}
            expiry="10/2023"
            modifiedOn="01/10/2023"
          />
        </ListItem>
      </List>
    </>
  );
}
