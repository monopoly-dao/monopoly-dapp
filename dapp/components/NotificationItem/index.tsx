import { Stack, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

const NotificationItem = ({ children }: { children: ReactNode }) => {
  const smallScreen = useMediaQuery("(max-width: 650px)");

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={smallScreen ? "10px" : "0"}
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
