"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import {
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useLogs } from "@/app/dashboard/logs/hooks";
import LogCard from "@/app/dashboard/logs/log-card";

export default function Logs() {
  useLogs();
  const logs = useAppSelector((state) => state.logsReducer.logs);
  const isFetchingLogs = useAppSelector(
    (state) => state.logsReducer.isFetchingLogs,
  );

  return (
    <>
      <Typography
        sx={{ mb: 1, textAlign: "center" }}
        variant="h4"
        component="div"
      >
        Logs
      </Typography>
      <Divider />
      {logs.length > 0 && (
        <Alert
          severity="info"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          This page shows 250 most recent logs.
        </Alert>
      )}
      <Divider />
      {isFetchingLogs ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      ) : logs.length > 0 ? (
        <List sx={{ mb: 8 }}>
          {logs.map((log) => (
            <ListItem key={log.id}>
              <LogCard
                user={log.user}
                action={log.action}
                productName={log.productName}
                description={log.description}
                timestamp={log.timestamp}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Alert
          severity="warning"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          No logs found.
        </Alert>
      )}
    </>
  );
}
