import Box from "@mui/material/Box";
import Sidebar from "../components/Base/Sidebar";
import * as React from "react";

import Container from "@mui/material/Container";

function MainPage() {
  return (
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          asd
        </Container>
      </Box>
    </Box>
  );
}

export default MainPage;
