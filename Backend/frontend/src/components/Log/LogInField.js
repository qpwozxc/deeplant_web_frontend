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
        } else if (user.type !== "Manager") {
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
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://static.wixstatic.com/media/3b5756_a962e05dd635419aa597ac8ea972cc70~mv2.jpg/v1/fill/w_1359,h_622,al_c,q_85,enc_auto/3b5756_a962e05dd635419aa597ac8ea972cc70~mv2.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "95% ",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={Deeplant_big_logo}
              style={{ width: 300, height: "auto" }}
            />

            <Box component="form" noValidate sx={{ mt: 3 }}>
              {
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="이메일 주소"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={loginEmail}
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="비밀번호"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={loginPassword}
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                  />
                </Box>
              }
              {loginError && (
                <Typography variant="caption" color="error">
                  {loginError}
                </Typography>
              )}
              <>
                <Button
                  onClick={login}
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2, bgcolor: "green" }}
                >
                  로그인
                </Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      color="primary"
                      checked={rememberMe} // Set checked prop based on the "rememberMe" state
                    />
                  }
                  label="아이디 저장"
                />
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      비밀번호를 잊으셨나요?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      계정이 없나요? 계정 생성하기
                    </Link>
                  </Grid>
                </Grid>
              </>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LogInField;
