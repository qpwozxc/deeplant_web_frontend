import Box from "@mui/material/Box";
import Sidebar from "../components/Base/Sidebar";
import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

import home1 from "../src_assets/home1.png";
import home2 from "../src_assets/home2.png";
import home3 from "../src_assets/home3.png";
import home4 from "../src_assets/home4.png";
import home5 from "../src_assets/home5.png";
import home6 from "../src_assets/home6.png";

const defaultTheme = createTheme();

const cards = [
  {
    title: "홈",
    image: home1,
    imageSize: { height: 140, width: 140 },
    link: "/Home",
  },
  {
    title: "대시보드",
    image: home2,
    imageSize: { height: 140, width: "100%" },
    link: "/DataManage",
  },
  {
    title: "통계 분석",
    image: home3,
    imageSize: { height: 140, width: "100%" },
    link: "/stats",
  },
  {
    title: "데이터 예측",
    image: home4,
    imageSize: { height: 140, width: "55%" },
    link: "/PA",
  },
  {
    title: "사용자 관리",
    image: home5,
    imageSize: { height: 140, width: "100%" },
    link: "/UserManagement",
  },
  {
    title: "프로필",
    image: home6,
    imageSize: { height: 140, width: "60%" },
    link: "/Profile",
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
                maxWidth: 261,
                maxHeight: 238,
                margin: "0 auto",
                border: "1px solid rgba(238, 238, 238, 0.50)",
                borderRadius: "40px",
                overflow: "hidden",
                backgroundColor: "white",
                boxShadow:
                  "box-shadow: 0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
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
