"use client";

import React, { useEffect } from "react";
import { useUsers } from "@/app/dashboard/users/hooks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { reset } from "@/app/dashboard/users/users-slice";
import {
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import UserCard from "@/app/dashboard/users/user-card";

export default function Users() {
  useUsers();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.usersReducer.users);
  const isFetchingUsers = useAppSelector(
    (state) => state.usersReducer.isFetchingUsers,
  );

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  return (
    <>
      <Typography
        sx={{ mb: 1, textAlign: "center" }}
        variant="h4"
        component="div"
      >
        Users
      </Typography>
      <Divider />
      {isFetchingUsers ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      ) : users.length > 0 ? (
        <List sx={{ mb: 8 }}>
          {users.map((user) => (
            <ListItem key={user.id}>
              <UserCard
                id={user.id}
                uid={user.uid}
                email={user.email}
                role={user.role}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Alert
          severity="warning"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          No users found.
        </Alert>
      )}
    </>
  );
}
