import React from "react";
import { Box, Paper } from "@mui/material";
import BottomNavigation from "@/app/dashboard/bottom-navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ width: "100%" }}>
      {children}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation />
      </Paper>
    </Box>
  );
}
