import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsConsumeProductDialogOpen } from "@/app/dashboard/products/products-slice";
import { List, ListItem, MenuItem } from "@mui/material";

export default function ConsumeProductDialog() {
  const dispatch = useAppDispatch();
  const isConsumeProductDialogOpen = useAppSelector(
    (state) => state.productsReducer.isConsumeProductDialogOpen,
  );

  const handleClose = () => {
    dispatch(setIsConsumeProductDialogOpen(false));
  };

  const handleConsume = () => {};

  return (
    <Dialog open={isConsumeProductDialogOpen} onClose={handleClose}>
      <DialogTitle>Consume product</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <TextField
              id="name"
              label="Product name"
              type="text"
              size="small"
              fullWidth
              disabled
            />
          </ListItem>
          <ListItem>
            <TextField
              id="outlined-select-currency"
              select
              label="Category"
              size="small"
              fullWidth
              disabled
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
        <Button onClick={handleConsume} variant="contained" size="small">
          Consume
        </Button>
      </DialogActions>
    </Dialog>
  );
}
