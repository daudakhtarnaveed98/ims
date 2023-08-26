import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsConfirmDialogOpen,
  setIsConsumeProductDialogOpen,
  setIsEditProductDialogOpen,
  setToConsumeProduct,
  setToDeleteProductId,
  setToEditProduct,
} from "@/app/dashboard/products/products-slice";
import { Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "@/app/dashboard/products/types";
import { DateTime } from "luxon";

export default function ProductCard({
  id,
  name,
  category,
  stock,
  expiry,
  modifiedOn,
  lowStockQuantity,
  isExpiryMandatory,
}: Product) {
  const dispatch = useAppDispatch();
  const isConsumingProduct = useAppSelector(
    (state) => state.productsReducer.isConsumingProduct,
  );
  const isDeletingProduct = useAppSelector(
    (state) => state.productsReducer.isDeletingProduct,
  );
  const isEditingProduct = useAppSelector(
    (state) => state.productsReducer.isEditingProduct,
  );
  const expiresInMonths = DateTime.fromFormat(expiry, "MM/yyyy")
    .diff(DateTime.now(), "months")
    .toObject()["months"];

  return (
    <Card sx={{ width: "100%" }}>
      {stock <= lowStockQuantity && stock > 0 && (
        <Chip
          sx={{ m: 1, float: "right" }}
          label="Low stock"
          color="warning"
          size="small"
        />
      )}
      {stock === 0 && (
        <Chip
          sx={{ m: 1, float: "right" }}
          label="Out of stock"
          color="error"
          size="small"
        />
      )}
      {expiresInMonths && expiresInMonths <= 6 && (
        <Chip
          sx={{ mt: 1, float: "right" }}
          label="Expires soon"
          color="error"
          size="small"
        />
      )}
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h6">{name}</Typography>
        <Typography color="text.secondary">Stock: {stock}</Typography>
        <Typography color="text.secondary">
          Expiry: {expiry === "" ? "N/A" : expiry}
        </Typography>
        <Typography color="text.secondary">
          Modified On: {modifiedOn}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          onClick={() => {
            if (
              id != null &&
              name != null &&
              category != null &&
              stock != null &&
              expiry != null &&
              modifiedOn != null &&
              lowStockQuantity != null &&
              isExpiryMandatory != null
            ) {
              dispatch(
                setToEditProduct({
                  id,
                  name,
                  category,
                  stock,
                  expiry,
                  modifiedOn,
                  lowStockQuantity,
                  isExpiryMandatory,
                }),
              );
              dispatch(setIsEditProductDialogOpen(true));
            }
          }}
          disabled={isEditingProduct}
        >
          <EditIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
        <IconButton
          color="warning"
          onClick={() => {
            if (
              id != null &&
              name != null &&
              category != null &&
              stock != null &&
              expiry != null &&
              modifiedOn != null &&
              lowStockQuantity != null &&
              isExpiryMandatory != null
            ) {
              dispatch(
                setToConsumeProduct({
                  id,
                  name,
                  category,
                  stock,
                  expiry,
                  modifiedOn,
                  lowStockQuantity,
                  isExpiryMandatory,
                }),
              );
              dispatch(setIsConsumeProductDialogOpen(true));
            }
          }}
          disabled={isConsumingProduct}
        >
          <ShoppingCartIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            if (id != null) {
              dispatch(setToDeleteProductId(id));
              dispatch(setIsConfirmDialogOpen(true));
            }
          }}
          disabled={isDeletingProduct}
        >
          <DeleteIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
