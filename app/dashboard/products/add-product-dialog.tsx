import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsAddProductDialogOpen } from "@/app/dashboard/products/products-slice";
import { List, ListItem, MenuItem } from "@mui/material";

export default function AddProductDialog() {
  const dispatch = useAppDispatch();
  const isAddProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isAddProductDialogOpen,
  );

  const handleClose = () => {
    dispatch(setIsAddProductDialogOpen(false));
  };

  const handleAdd = () => {};

  const handleChange = () => {};

  return (
    <Dialog open={isAddProductDialogOpen} onClose={handleClose}>
      <DialogTitle>Add product</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <TextField
              id="name"
              label="Product name"
              type="text"
              size="small"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              id="name"
              label="Product quantity"
              type="number"
              size="small"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              id="name"
              label="Product expiry"
              type="text"
              size="small"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              id="outlined-select-currency"
              select
              label="Category"
              size="small"
              fullWidth
            >
              <MenuItem key="injections" value="injections">
                Injections
              </MenuItem>
            </TextField>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          size="small"
          color="error"
        >
          Close
        </Button>
        <Button onClick={handleAdd} variant="contained" size="small">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
