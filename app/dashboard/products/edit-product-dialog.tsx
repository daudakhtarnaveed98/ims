import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsEditProductDialogOpen } from "@/app/dashboard/products/products-slice";
import { List, ListItem, MenuItem } from "@mui/material";

export default function EditProductDialog() {
  const dispatch = useAppDispatch();
  const isEditProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isEditProductDialogOpen,
  );

  const handleClose = () => {
    dispatch(setIsEditProductDialogOpen(false));
  };

  const handleEdit = () => {};

  const handleChange = () => {};

  return (
    <Dialog open={isEditProductDialogOpen} onClose={handleClose}>
      <DialogTitle>Edit product</DialogTitle>
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
              label="Product expiry"
              type="text"
              size="small"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              id="category"
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
          <ListItem>
            <TextField
              id="name"
              label="Product quantity"
              type="number"
              size="small"
              fullWidth
              disabled
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
        <Button onClick={handleEdit} variant="contained" size="small">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
