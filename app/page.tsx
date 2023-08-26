"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import "@/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setIsLoggingIn,
  setIsSendingVerificationEmail,
  setUser,
} from "@/app/user-slice";
import { useSnackbar } from "notistack";
// @ts-ignore
import firebase from "firebase/compat";
import FirebaseError = firebase.FirebaseError;

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Ghauri Medics
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const auth = getAuth();
  const isLoggingIn = useAppSelector((state) => state.userReducer.isLoggingIn);
  const isIsSendingVerificationEmail = useAppSelector(
    (state) => state.userReducer.isSendingVerificationEmail,
  );
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        dispatch(setIsLoggingIn(true));

        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );

        dispatch(setIsLoggingIn(false));

        const { user } = userCredential;

        if (!user.emailVerified) {
          enqueueSnackbar({
            message: "Email is not verified!",
            variant: "error",
          });

          enqueueSnackbar({
            message: "Sending verification email!",
            variant: "info",
          });

          dispatch(setIsSendingVerificationEmail(true));

          await sendEmailVerification(user);

          dispatch(setIsSendingVerificationEmail(false));

          enqueueSnackbar({
            message:
              "Verification email sent successfully, please check your email!",
            variant: "success",
          });

          return;
        }

        const userInfoToSet = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        };

        dispatch(setUser(userInfoToSet));

        enqueueSnackbar({
          message: "User logged in successfully!",
          variant: "success",
        });
      } catch (e: FirebaseError) {
        console.error(e);

        dispatch(setIsLoggingIn(false));
        dispatch(setIsSendingVerificationEmail(false));

        const { code } = e;

        if (code === "auth/wrong-password") {
          enqueueSnackbar({
            message: "Invalid credentials!",
            variant: "error",
          });

          return;
        }

        if (code === "auth/user-not-found") {
          enqueueSnackbar({
            message: "User does not exist!",
            variant: "error",
          });

          return;
        }

        if (code === "auth/too-many-requests") {
          enqueueSnackbar({
            message: "User has been blocked temporarily please reset password!",
            variant: "error",
          });

          return;
        }

        enqueueSnackbar({
          message:
            "An error occurred while logging in, please try again later!",
          variant: "error",
        });
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form id="loginForm" onSubmit={formik.handleSubmit}>
          <Box sx={{ mt: 1 }}>
            <TextField
              id="email"
              name="email"
              label="Email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              margin="normal"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              form="loginForm"
              disabled={isLoggingIn || isIsSendingVerificationEmail}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Reset password
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
