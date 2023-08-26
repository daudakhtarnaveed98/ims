import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "@/app/dashboard/users/types";
import {
  setIsConfirmDialogOpen,
  setIsSendingPasswordResetEmail,
  setToDeleteUser,
} from "@/app/dashboard/users/users-slice";
import { LockReset } from "@mui/icons-material";
import { sendPasswordResetEmail } from "@firebase/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/firebase";
import { useSnackbar } from "notistack";

export default function UserCard({ id, email, role, uid }: User) {
  const dispatch = useAppDispatch();
  const auth = getAuth(firebaseApp);
  const { enqueueSnackbar } = useSnackbar();
  const isSendingPasswordResetEmail = useAppSelector(
    (state) => state.usersReducer.isSendingPasswordResetEmail,
  );
  const isDeletingUser = useAppSelector(
    (state) => state.usersReducer.isDeletingUser,
  );
  const { role: userRole } = useAppSelector((state) => state.userReducer.user);

  const isDisabled = () => {
    return userRole !== "OWNER";
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
          onClick={async () => {
            if (id != null && uid != null && email != null && role != null) {
              try {
                dispatch(setIsSendingPasswordResetEmail(true));
                await sendPasswordResetEmail(auth, email);

                enqueueSnackbar({
                  message: "Password reset email sent successfully!",
                  variant: "success",
                });

                dispatch(setIsSendingPasswordResetEmail(false));
              } catch (e) {
                enqueueSnackbar({
                  message:
                    "An error occurred while sending password reset email!",
                  variant: "error",
                });

                dispatch(setIsSendingPasswordResetEmail(false));

                console.error(e);
              }
            }
          }}
          disabled={isDisabled() || isSendingPasswordResetEmail}
        >
          <LockReset sx={{ height: 24, width: 24 }} />
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
          disabled={isDisabled() || isDeletingUser}
        >
          <DeleteIcon sx={{ height: 24, width: 24 }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
