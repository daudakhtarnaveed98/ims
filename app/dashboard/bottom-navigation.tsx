"use client";

import React, { useEffect } from "react";
import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction as MUIBottomNavigationAction,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MedicationIcon from "@mui/icons-material/Medication";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setValue } from "@/app/dashboard/bottom-navigation-slice";

export default function BottomNavigation() {
  const dispatch = useAppDispatch();
  const currentMenu = useAppSelector(
    (state) => state.bottomNavigationReducer.value,
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case "/dashboard/consumptions":
        dispatch(setValue(0));
        break;
      case "/dashboard/products":
        dispatch(setValue(1));
        break;
    }
  }, [dispatch, pathname]);

  return (
    <>
      <MUIBottomNavigation
        showLabels
        value={currentMenu}
        onChange={(event, newValue) => {
          dispatch(setValue(newValue));

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
