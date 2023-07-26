import Box from "@mui/material/Box";
import Sidebar from "../components/Base/Sidebar";
import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import deeplantLogo from "../src_assets/deeplant-logo.png";
import MeatImage from "../src_assets/Meat.png";
import StatisticImage from "../src_assets/StatisticImage.avif";
import CardActionArea from "@mui/material/CardActionArea";
import UserImage from "../src_assets/UserImage2.png";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { CardActions } from "@mui/material";
import ProfileImage from "../src_assets/Profile.jpg";
import LogOutImage from "../src_assets/LogOut.svg";
const defaultTheme = createTheme();

const cards = [
  {
    title: "홈",
    description: "딥플랜트 홈",
    sub_description: "홈페이지",
    image: deeplantLogo,
    imageSize: { height: 140, width: 140 },
    link: "/Home",
  },
  {
    title: "대시보드",
    description: "대시보드",
    sub_description: "대시보드",
    image: MeatImage,
    imageSize: { height: 140, width: "100%" },
    link: "/DataManage",
  },
  {
    title: "통계 분석",
    description: "통계 분석",
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
  {
    title: "데이터 예측",
    description: "데이터 예측",
    sub_description: "데이터 예측",
    image: ProfileImage,
    imageSize: { height: 140, width: "55%" },
    link: "/PA",
  },
  {
    title: "로그아웃",
    description: "로그인 페이지로 이동",
    sub_description: "로그아웃",
    image: LogOutImage,
    imageSize: { height: 140, width: "60%" },
    link: "/UserManagement",
  },
];
function Home() {
  const navigate = useNavigate();
  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={5}>
        {cards.map((card) => (
          <Grid item xs={12} sm={4} md={4} lg={4} key={card}>
            <Box
              sx={{
                maxWidth: 300,
                margin: "0 auto",
                border: "1px solid #e0e0e0",
                borderRadius: "30px",
                overflow: "hidden",
                backgroundColor: "white",
              }}
            >
              <CardActionArea onClick={() => handleCardClick(card.link)}>
                <CardMedia
                  sx={{
                    ...card.imageSize,
                    margin: "0 auto",
                  }}
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
              </CardActionArea>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
