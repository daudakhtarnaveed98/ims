"use client";

import React, { useEffect } from "react";
import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction as MUIBottomNavigationAction,
} from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import MedicationIcon from "@mui/icons-material/Medication";
import CategoryIcon from "@mui/icons-material/Category";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setValue } from "@/app/dashboard/bottom-navigation-slice";
import { Logout, Person } from "@mui/icons-material";
import { setIsConfirmDialogOpen } from "@/app/dashboard/dashboard-slice";

export default function BottomNavigation() {
  const dispatch = useAppDispatch();
  const currentMenu = useAppSelector(
    (state) => state.bottomNavigationReducer.value,
  );
  const router = useRouter();
  const pathname = usePathname();
  const { role } = useAppSelector((state) => state.userReducer.user);

  const isOwner = () => role === "OWNER";

  useEffect(() => {
    switch (pathname) {
      case "/dashboard/logs":
        dispatch(setValue(0));
        break;
      case "/dashboard/products":
        dispatch(setValue(1));
        break;
      case "/dashboard/categories":
        dispatch(setValue(2));
        break;
      case "/dashboard/users":
        dispatch(setValue(3));
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
              router.push("/dashboard/logs");
              break;
            case 1:
              router.push("/dashboard/products");
              break;
            case 2:
              router.push("/dashboard/categories");
              break;
            case 3:
              router.push("/dashboard/users");
              break;
            case 4:
              dispatch(setIsConfirmDialogOpen(true));
              break;
          }
        }}
      >
        <MUIBottomNavigationAction label="Logs" icon={<FeedIcon />} />
        <MUIBottomNavigationAction label="Products" icon={<MedicationIcon />} />
        <MUIBottomNavigationAction label="Categories" icon={<CategoryIcon />} />
        {isOwner() && (
          <MUIBottomNavigationAction label="Users" icon={<Person />} />
        )}
        <MUIBottomNavigationAction label="Logout" icon={<Logout />} />
      </MUIBottomNavigation>
    </>
  );
}
