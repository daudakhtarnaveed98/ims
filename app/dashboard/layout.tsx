"use client";

import React from "react";
import { Box, Paper } from "@mui/material";
import BottomNavigation from "@/app/dashboard/bottom-navigation";
import AddButton from "@/app/dashboard/add-button";
import AddCategoryDialog from "@/app/dashboard/categories/add-category-dialog";
import AddProductDialog from "@/app/dashboard/products/add-product-dialog";
import ConsumeProductDialog from "@/app/dashboard/products/consume-product-dialog";
import EditProductDialog from "@/app/dashboard/products/edit-product-dialog";
import CategoryDeleteConfirmationDialog from "@/app/dashboard/categories/delete-confirmation-dialog";
import ProductDeleteConfirmationDialog from "@/app/dashboard/products/delete-confirmation-dialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CategoryDeleteConfirmationDialog />
      <ProductDeleteConfirmationDialog />
      <AddCategoryDialog />
      <EditProductDialog />
      <AddProductDialog />
      <ConsumeProductDialog />
      <Box sx={{ width: "100%" }}>
        {children}
        <AddButton />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation />
        </Paper>
      </Box>
    </>
  );
}
