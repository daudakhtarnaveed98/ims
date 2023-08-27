"use client";

import React, { useEffect } from "react";
import { AppBar, Box, Paper, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import BottomNavigation from "@/app/dashboard/bottom-navigation";
import AddButton from "@/app/dashboard/add-button";
import AddCategoryDialog from "@/app/dashboard/categories/add-category-dialog";
import AddProductDialog from "@/app/dashboard/products/add-product-dialog";
import ConsumeProductDialog from "@/app/dashboard/products/consume-product-dialog";
import EditProductDialog from "@/app/dashboard/products/edit-product-dialog";
import CategoryDeleteConfirmationDialog from "@/app/dashboard/categories/delete-confirmation-dialog";
import ProductDeleteConfirmationDialog from "@/app/dashboard/products/delete-confirmation-dialog";
import UserDeleteConfirmationDialog from "@/app/dashboard/users/delete-confirmation-dialog";
import AddUserDialog from "@/app/dashboard/users/add-user-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useSnackbar } from "notistack";
import LogoutConfirmationDialog from "@/app/dashboard/logout-confirmation-dialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector((state) => state.userReducer.user);

  useEffect(() => {
    const isUserLoggedIn = () => {
      return Object.keys(user).length !== 0;
    };

    if (!isUserLoggedIn() && pathname !== "/") {
      router.push("/login");

      enqueueSnackbar({
        message: "Please login to your account!",
        variant: "error",
      });
    }
  }, [router, pathname, user, enqueueSnackbar]);

  return (
    <>
      <AddUserDialog />
      <CategoryDeleteConfirmationDialog />
      <ProductDeleteConfirmationDialog />
      <UserDeleteConfirmationDialog />
      <LogoutConfirmationDialog />
      <AddCategoryDialog />
      <EditProductDialog />
      <AddProductDialog />
      <ConsumeProductDialog />
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Hi, {user.email}!
          </Typography>
        </Toolbar>
      </AppBar>
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
