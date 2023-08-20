import * as React from "react";
import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ListIcon from "@mui/icons-material/List";
import {
  setSearchQuery,
  setSelectedCategory,
} from "@/app/dashboard/products/products-slice";

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories,
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (event: any) => {
    const { myValue } = event.currentTarget.dataset;

    dispatch(setSelectedCategory(myValue));
    dispatch(setSearchQuery(""));
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <ListIcon />
      </IconButton>
      <Menu
        id="categoryMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        TransitionComponent={Fade}
      >
        {categories.map((category) => (
          <MenuItem
            key={category.name}
            data-my-value={category.name}
            onClick={handleMenuClick}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
