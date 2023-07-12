import Box from "@mui/material/Box";
import Sidebar from "../components/Base/Sidebar";
import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import deeplantLogo from "../src_assets/deeplant-logo.png";
import MeatImage from "../src_assets/MeatImage.webp";
import StatisticImage from "../src_assets/StatisticImage.avif";
import CardActionArea from "@mui/material/CardActionArea";
import UserImage from "../src_assets/UserImage2.png";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { CardActions } from "@mui/material";
const defaultTheme = createTheme();

const cards = [
  {
    title: "홈",
    description: "딥플랜트 관리자 페이지 홈입니다.",
    sub_description: "홈페이지",
    image: deeplantLogo,
    imageSize: { height: 140, width: 140 },
    link: "/MainPage",
  },
  {
    title: "데이터 조회",
    description: "육류 데이터 관리/검토",
    sub_description: "육류 데이터 관리/검토 ",
    image: MeatImage,
    imageSize: { height: 140, width: "130%" },
    link: "/Home",
  },
  {
    title: "통계 조회",
    description: "통계 조회 페이지입니다.",
    sub_description: "",
    image: StatisticImage,
    imageSize: { height: 140, width: "100%" },
    link: "/stats",
  },
  {
    title: "사용자 관리",
    description: "사용자 입력정보 열람 및 확인",
    sub_description: "사용자 입력정보 열람 및 확인",
    image: UserImage,
    imageSize: { height: 140, width: "100%" },
    link: "/UserManagement",
  },
];
function MainPage() {
  const navigate = useNavigate();
  const handleCardClick = (link) => {
    navigate(link);
  };

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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          <Container maxWidth="sm">
            <Grid container spacing={5}>
              {cards.map((card) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={card}>
                  <Box
                    sx={{
                      maxWidth: 300,
                      margin: "0 auto",
                      border: "1px solid #e0e0e0",
                      borderRadius: "4px",
                      overflow: "hidden",
                      backgroundColor: "white",
                    }}
                  >
                    <CardActionArea
                      sx={{ maxWidth: 300, margin: "0 auto" }}
                      onClick={() => handleCardClick(card.link)}
                    >
                      <CardMedia
                        sx={{ ...card.imageSize }}
                        image={card.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.description}
                        </Typography>
                      </CardContent>
                      {/* <CardActions>
                      <Typography variant="body2" color="green">
                        {card.sub_description}
                      </Typography>
                    </CardActions> */}
                    </CardActionArea>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default MainPage;
