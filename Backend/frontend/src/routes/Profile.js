import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomSnackbar from "../components/Base/CustomSnackbar";
import { CircularProgress } from "@mui/material";
const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

export default function Profile() {
  const [modifiedUserInfo, setModifiedUserInfo] = useState({
    name: UserInfo.name,
    company: UserInfo.company,
    jobTitle: UserInfo.jobTitle,
    homeAddr: UserInfo.homeAddr,
  });
  const [updatedUserInfo, setUpdatedUserInfo] = useState(UserInfo);
  const [isUpdating, setIsUpdating] = useState(false);

  // Function to handle user information update
  const updateUserInfo = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch("http://3.38.52.82/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: UserInfo.userId,
          password: UserInfo.password,
          name: modifiedUserInfo.name, // <-- Use the updated name
          company: modifiedUserInfo.company, // <-- Use the updated company
          jobTitle: modifiedUserInfo.jobTitle, // <-- Use the updated jobTitle
          homeAddr: modifiedUserInfo.homeAddr, // <-- Use the updated homeAddr
          alarm: UserInfo.alarm,
          type: UserInfo.type,
        }),
      });
      console.log(UserInfo.userId);
      if (response.ok) {
        const updatedData = await response.json();
        setUpdatedUserInfo(updatedData);
        showSnackbar("회원정보가 수정되었습니다.", "success");
      } else {
        showSnackbar("회원정보 수정에 실패했습니다.", "error");
      }
    } catch (error) {
      console.log("Error updating user information:", error);
      showSnackbar("서버와 통신 중 오류가 발생했습니다.", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
  const { name, company, jobTitle, homeAddr } = modifiedUserInfo;
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
                value={name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="직장"
                name="company"
                value={company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="직책"
                name="jobTitle"
                value={jobTitle}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="주소"
                name="homeAddr"
                value={homeAddr}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={updateUserInfo}
                disabled={isUpdating}
              >
                {isUpdating ? <CircularProgress size={24} /> : "정보 수정"}
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
