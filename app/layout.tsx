"use client";

import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import "@fontsource/inter";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/providers";
import { SnackbarProvider } from "notistack";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          maxSnack={2}
          autoHideDuration={1000}
        >
          <Providers>{children}</Providers>
        </SnackbarProvider>
      </body>
    </html>
  );
}
