import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsAddCategoryDialogOpen } from "@/app/dashboard/categories/categories-slice";
import { List, ListItem } from "@mui/material";

export default function AddCategoryDialog() {
  const dispatch = useAppDispatch();
  const isAddCategoryDialogOpen = useAppSelector(
    (state) => state.categoriesReducer.isAddCategoryDialogOpen,
  );

  const handleClose = () => {
    dispatch(setIsAddCategoryDialogOpen(false));
  };

  const handleAdd = () => {};

  return (
    <Dialog open={isAddCategoryDialogOpen} onClose={handleClose}>
      <DialogTitle>Add new category</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <TextField
              id="name"
              label="Category name"
              type="text"
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
        <Button onClick={handleAdd} variant="contained" size="small">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
