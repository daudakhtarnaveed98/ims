import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Log } from "@/app/dashboard/logs/types";

export default function LogCard({
  user,
  action,
  productName,
  description,
  timestamp,
}: Log) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {action}
        </Typography>
        <Typography variant="h6">{productName}</Typography>
        <Typography color="text.secondary">{description}</Typography>
        <Typography color="text.secondary">Timestamp: {timestamp}</Typography>
        <Typography color="text.secondary">User: {user}</Typography>
      </CardContent>
    </Card>
  );
}
