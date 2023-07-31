import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function CustomSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleSnackbarClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default CustomSnackbar;
