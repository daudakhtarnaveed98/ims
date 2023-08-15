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
import { useAppDispatch } from "@/redux/hooks";

export default function AddButton() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    {
      icon: <MedicationIcon />,
      name: "Product",
      onClick: () => {
        dispatch(setIsAddProductDialogOpen(true));
      },
    },
    {
      icon: <CategoryIcon />,
      name: "Category",
      onClick: () => {
        dispatch(setIsAddCategoryDialogOpen(true));
      },
    },
  ];

  return (
    <Box>
      <Backdrop open={open} />
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
    </Box>
  );
}
