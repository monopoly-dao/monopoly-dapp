import { Stack } from "@mui/material";
import { ReactNode } from "react";

const NotificationItem = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        "& > p": {
          width: "80%",
        },
      }}
    >
      {children}
    </Stack>
  );
};

export default NotificationItem;
