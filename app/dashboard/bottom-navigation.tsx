"use client";

import React, { useEffect } from "react";
import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction as MUIBottomNavigationAction,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MedicationIcon from "@mui/icons-material/Medication";
import { useRouter, usePathname } from "next/navigation";

export default function BottomNavigation() {
  const [currentMenu, setCurrentMenu] = React.useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case "/dashboard/products":
        setCurrentMenu(1);
        break;

      case "/dashboard/consumptions":
        setCurrentMenu(0);
        break;
    }
  }, [pathname]);

  return (
    <>
      <MUIBottomNavigation
        showLabels
        value={currentMenu}
        onChange={(event, newValue) => {
          setCurrentMenu(newValue);

          switch (newValue) {
            case 0:
              router.push("/dashboard/consumptions");
              break;
            case 1:
              router.push("/dashboard/products");
              break;
          }
        }}
      >
        <MUIBottomNavigationAction
          label="Consumptions"
          icon={<ShoppingCartIcon />}
        />
        <MUIBottomNavigationAction label="Products" icon={<MedicationIcon />} />
      </MUIBottomNavigation>
    </>
  );
}
