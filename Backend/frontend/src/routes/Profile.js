import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomSnackbar from "../components/Base/CustomSnackbar";
const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

export default function Profile() {
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    userId: UserInfo.userId,
    createdAt: UserInfo.createdAt,
    updatedAt: UserInfo.updatedAt,
    password: UserInfo.password,
    name: UserInfo.name,
    company: UserInfo.company,
    jobTitle: UserInfo.jobTitle,
    homeAddr: UserInfo.homeAddr,
    loginAt: UserInfo.loginAt,
    alarm: UserInfo.alarm,
    type: UserInfo.type,
  });

  // Function to handle user information update
  const updateUserInfo = async () => {
    try {
      showSnackbar("회원정보가 수정되었습니다.", "success");
      const response = await fetch("http://3.38.52.82/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedInfo = await response.json();
      localStorage.setItem("UserInfo", JSON.stringify(updatedInfo));
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Only update the editable fields
    if (["name", "company", "jobTitle", "homeAddr"].includes(name)) {
      setUpdatedUserInfo({
        ...updatedUserInfo,
        [name]: value,
      });
    }
    console.log("updatedUserInfo", updatedUserInfo);
  };

  ///////////
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  ////////////
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Grid item xs={6} sm={2}>
        <Paper sx={{ p: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="회원가입일"
                name="createdAt"
                value={updatedUserInfo.createdAt}
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                label="업데이트일"
                name="updatedAt"
                value={updatedUserInfo.updatedAt}
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                label="권한"
                name="type"
                value={updatedUserInfo.type}
                disabled
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={2}>
        <Paper sx={{ p: 2 }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="이름"
                name="name"
                value={updatedUserInfo.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="직장"
                name="company"
                value={updatedUserInfo.company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="직책"
                name="jobTitle"
                value={updatedUserInfo.jobTitle}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="주소"
                name="homeAddr"
                value={updatedUserInfo.homeAddr}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={updateUserInfo}>
                정보 수정
              </Button>
              <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={closeSnackbar}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
