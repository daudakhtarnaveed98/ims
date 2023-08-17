"use client";

import React from "react";
import {
  IconButton,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import DeleteConfirmationDialog from "@/app/dashboard/categories/delete-confirmation-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { setIsConfirmDialogOpen } from "@/app/dashboard/categories/categories-slice";
import DeleteIcon from "@mui/icons-material/Delete";

export interface ICategoryCard {
  name: string;
  totalStock: number;
}
export default function CategoryCard({ name, totalStock }: ICategoryCard) {
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">Total stock:{totalStock}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="error"
          onClick={() => dispatch(setIsConfirmDialogOpen(true))}
        >
          <DeleteIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
