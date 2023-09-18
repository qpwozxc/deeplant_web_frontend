import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Deeplant_big_logo from "../../src_assets/Deeplant_big_logo.png";
import Layer_1 from "../../src_assets/Layer_1.png";
import BackGround from "../../src_assets/BackGround.png";
import { id } from "date-fns/locale";

const defaultTheme = createTheme();
const LogInField = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // New state variable for "Remember Me" checkbox

  useEffect(() => {
    // Check if the email was stored in the local storage
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setLoginEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(userCredential.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  const login = async () => {
    try {
      if (!loginEmail) {
        setLoginError("아이디를 입력해주세요.");
        return;
      }
      if (!loginPassword) {
        setLoginError("비밀번호를 입력해주세요.");
        return;
      }
      const auth = getAuth();
      const response = await fetch(
        `http://3.38.52.82//user/login?id=${loginEmail}`
      );
      const user = await response.json();
      try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          //아이디가 존재하지 않는다면
          setLoginError("존재하지 않는 아이디입니다.");
          return;
        } else if (user.type == "Normal") {
          //아이디는 존재하지만 관리자가 아니라면
          setLoginError("로그인 권한이 없습니다. 관리자에게 문의해주세요.");
          return;
        } else if (error.code === "auth/too-many-requests") {
          //로그인을 너무 많이 시도하면
          setLoginError(
            "로그인을 너무 많이 시도했습니다. 잠시후 다시 시도해주세요."
          );
          return;
        } else {
          // 비밀번호가 일치하지 않는다면
          setLoginError("비밀번호가 일치하지 않습니다.");
          return;
        }
      }
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", loginEmail);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      //로그인 성공 시 홈으로 이동
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      localStorage.setItem("UserInfo", JSON.stringify(user));
      navigate("/Home?userId=" + encodeURIComponent(user.userId));
    } catch (error) {
      console.log(error.message);
      setLoginError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (event.target.name === "email") {
        // 아이디 필드에서 Enter 키를 누르면 비밀번호 필드로 이동
        document.getElementById("password").focus();
      } else if (event.target.name === "password") {
        // 비밀번호 필드에서 Enter 키를 누르면 로그인 버튼 클릭
        login();
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          minHeight: "100vh", // 전체 화면 높이
          minWidth: "100vw", // 전체 화면 너비
          backgroundImage: `url(${BackGround})`, // 경로를 실제 파일 경로로 변경
          backgroundSize: "cover", // 배경 이미지 크기 조절 (cover는 화면 전체를 채우도록 설정)
          backgroundRepeat: "no-repeat", // 배경 이미지 반복 방지
        }}
      >
        <CssBaseline />
        <img
          src={Layer_1}
          style={{
            width: 300,
            height: "auto",
            marginBottom: "20px",
            marginTop: "200px",
          }}
        />

        <Box
          component="form"
          noValidate
          sx={{
            display: "flex", // 요소들을 flex로 배치
            flexDirection: "column", // 세로로 배치
            width: "450px", // 너비를 450px로 설정
            height: "594px",
            bgcolor: "white",
            paddingX: "42px", // 가로 패딩
            paddingY: "44px", // 세로 패딩
            borderRadius: "20px",
            mb: "160px",
          }}
        >
          <TextField
            required
            id="email"
            label="이메일을 입력하세요."
            name="email"
            autoComplete="email"
            autoFocus
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
            onKeyPress={handleKeyPress}
            sx={{
              width: "365px", // 너비를 365px로 설정
              height: "72px", // 높이를 72px로 설정
            }}
          />

          <TextField
            margin="normal"
            required
            name="password"
            label="비밀번호를 입력하세요."
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginPassword}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
            onKeyPress={handleKeyPress}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                color="primary"
                checked={rememberMe}
              />
            }
            label="아이디 저장"
          />
          {loginError && (
            <Typography variant="caption" color="error">
              {loginError}
            </Typography>
          )}
          <Button
            onClick={login}
            variant="contained"
            sx={{ mt: "162px", bgcolor: "#7BD758" }}
          >
            로그인
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LogInField;
