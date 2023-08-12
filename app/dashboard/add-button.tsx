import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MedicationIcon from "@mui/icons-material/Medication";
import CategoryIcon from "@mui/icons-material/Category";

const actions = [
  { icon: <ShoppingCartIcon />, name: "Consumption" },
  { icon: <MedicationIcon />, name: "Product" },
  { icon: <CategoryIcon />, name: "Category" },
];

export default function AddButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Add button"
        sx={{
          position: "absolute",
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
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
