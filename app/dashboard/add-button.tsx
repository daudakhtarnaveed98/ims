import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import MedicationIcon from "@mui/icons-material/Medication";
import CategoryIcon from "@mui/icons-material/Category";
import { setIsAddCategoryDialogOpen } from "@/app/dashboard/categories/categories-slice";
import { setIsAddProductDialogOpen } from "@/app/dashboard/products/products-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Person } from "@mui/icons-material";
import { setIsAddUserDialogOpen } from "@/app/dashboard/users/users-slice";

export default function AddButton() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { role } = useAppSelector((state) => state.userReducer.user);

  const isOwner = () => role === "OWNER";

  const addUserAction = {
    icon: <Person />,
    name: "User",
    onClick: () => {
      dispatch(setIsAddUserDialogOpen(true));
    },
  };

  const addCategoryAction = {
    icon: <CategoryIcon />,
    name: "Category",
    onClick: () => {
      dispatch(setIsAddCategoryDialogOpen(true));
    },
  };

  const addProductAction = {
    icon: <MedicationIcon />,
    name: "Product",
    onClick: () => {
      dispatch(setIsAddProductDialogOpen(true));
    },
  };

  const actions = [addCategoryAction, addProductAction];

  if (isOwner()) {
    actions.splice(0, 0, addUserAction);
  }

  return (
    <Box>
      <Backdrop open={open} />
      {isOwner() && (
        <SpeedDial
          ariaLabel="Add button"
          sx={{
            position: "fixed",
            bottom: 72,
            right: 16,
          }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      )}
    </Box>
  );
}
