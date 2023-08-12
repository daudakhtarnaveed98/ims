"use client";

import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import DeleteConfirmationDialog from "@/app/dashboard/categories/delete-confirmation-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { setIsConfirmDialogOpen } from "@/app/dashboard/categories/categories-slice";

export interface ICategoryCard {
  name: string;
  totalProducts: number;
}
export default function CategoryCard({ name, totalProducts }: ICategoryCard) {
  const dispatch = useAppDispatch();

  return (
    <>
      <DeleteConfirmationDialog />
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography color="text.secondary">{totalProducts}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(setIsConfirmDialogOpen(true))}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
