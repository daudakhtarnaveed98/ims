import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "@/redux/hooks";
import {
  setIsConfirmDialogOpen,
  setIsConsumeProductDialogOpen,
  setIsEditProductDialogOpen,
} from "@/app/dashboard/products/products-slice";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "@/app/dashboard/products/types";

export default function ProductCard({
  name,
  category,
  stock,
  expiry,
  modifiedOn,
}: Product) {
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">Stock: {stock}</Typography>
        <Typography color="text.secondary">Expiry: {expiry}</Typography>
        <Typography color="text.secondary">
          Modified On: {modifiedOn}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          onClick={() => dispatch(setIsEditProductDialogOpen(true))}
        >
          <EditIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
        <IconButton
          color="warning"
          onClick={() => dispatch(setIsConsumeProductDialogOpen(true))}
        >
          <ShoppingCartIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
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
