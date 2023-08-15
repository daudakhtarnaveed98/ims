"use client";

import React from "react";
import CategoryCard from "@/app/dashboard/categories/category-card";
import { Divider, List, ListItem, Typography } from "@mui/material";

export default function Categories() {
  return (
    <>
      <Typography
        sx={{ mb: 1, textAlign: "center" }}
        variant="h4"
        component="div"
      >
        Categories
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <CategoryCard name={"Injections"} totalStock={100} />
        </ListItem>
        <ListItem>
          <CategoryCard name={"Tablets"} totalStock={100} />
        </ListItem>
      </List>
    </>
  );
}
