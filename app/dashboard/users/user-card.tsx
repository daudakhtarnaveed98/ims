import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppDispatch } from "@/redux/hooks";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "@/app/dashboard/users/types";
import {
  setIsConfirmDialogOpen,
  setIsEditUserDialogOpen,
  setToDeleteUser,
  setToEditUser,
} from "@/app/dashboard/users/users-slice";

export default function UserCard({ id, email, role, uid }: User) {
  const dispatch = useAppDispatch();

  const isDisabled = () => {
    return role !== "OWNER";
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {id}
        </Typography>
        <Typography variant="h6">{email}</Typography>
        <Typography color="text.secondary">Role: {role}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          onClick={() => {
            if (id != null && uid != null && email != null && role != null) {
              dispatch(
                setToEditUser({
                  id,
                  uid,
                  email,
                  role,
                }),
              );
              dispatch(setIsEditUserDialogOpen(true));
            }
          }}
        >
          <EditIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            if (id != null && uid != null && email != null && role != null) {
              dispatch(
                setToDeleteUser({
                  id,
                  uid,
                  email,
                  role,
                }),
              );
              dispatch(setIsConfirmDialogOpen(true));
            }
          }}
          disabled={isDisabled()}
        >
          <DeleteIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
