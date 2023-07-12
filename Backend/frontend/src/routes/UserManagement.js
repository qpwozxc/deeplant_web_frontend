import React from "react";
import UserList from "../components/User/UserList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Sidebar from "../components/Base/Sidebar";

const defaultTheme = createTheme();
function UserManagement() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <UserList />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserManagement;
