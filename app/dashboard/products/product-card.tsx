import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteConfirmationDialog from "@/app/dashboard/products/delete-confirmation-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { setIsConfirmDialogOpen } from "@/app/dashboard/products/products-slice";

export interface ICategoryCard {
  name: string;
  category: string;
  quantity: number;
  expiry: string;
}

export default function ProductCard({
  name,
  category,
  quantity,
  expiry,
}: ICategoryCard) {
  const dispatch = useAppDispatch();

  return (
    <>
      <DeleteConfirmationDialog />
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {category}
          </Typography>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Quantity: {quantity}
          </Typography>
          <Typography variant="body2">Expiry: {expiry}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">
            Edit
          </Button>
          <Button
            size="small"
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
