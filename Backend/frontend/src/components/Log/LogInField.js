import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

const defaultTheme = createTheme();
const LogInField = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser); // currentUser가 존재하면 true, 그렇지 않으면 false
    });

    return () => {
      unsubscribe();
    };
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      navigate("/Home");
    } catch (error) {
      console.log(error.message);
      setLoginError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
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
                  control={<Checkbox value="remember" color="primary" />}
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
