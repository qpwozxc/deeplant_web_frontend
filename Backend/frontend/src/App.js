import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./routes/LogIn";
import Home from "./routes/Home";
import DataManage from "./routes/DataManage";
import Stats from "./routes/Stats";

import Profile from "./routes/Profile";
import DataEdit from "./routes/DataEdit";
import UserManagement from "./routes/UserManagement";

import Box from "@mui/material/Box";
import Sidebar from "./components/Base/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import BackGroundImage from "./src_assets/BackGround.jpg";
const defaultTheme = createTheme();

function App() {
  const routes = [
    {
      path: "/",
      title: "LogIn | DeePlant",
      component: <LogIn />,
    },
    {
      path: "/Home",
      title: "Home | DeePlant",
      component: <Home />,
    },
    {
      path: "/DataManage",
      title: "DataManage | DeePlant",
      component: <DataManage />,
    },
    {
      path: "/dataView/:id",
      title: "DataView | DeePlant",
      component: <DataEdit />,
    },
    {
      path: "/stats",
      title: "Statistics | DeePlant",
      component: <Stats />,
    },
    {
      path: "/profile",
      title: "Profile | DeePlant",
      component: <Profile />,
    },
    {
      path: "/UserManagement",
      title: "UserManage | Deepl",
      component: <UserManagement />,
    },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <>
                <Helmet>
                  <title>{route.title}</title>
                </Helmet>
                <ThemeProvider theme={defaultTheme}>
                  {route.path === "/" ? (
                    route.component
                  ) : (
                    <Box sx={{ display: "flex" }}>
                      <Sidebar />
                      <Box
                        component="main"
                        sx={{
                          // backgroundImage: `url(${BackGroundImage})`,
                          // backgroundSize: "cover",
                          // backgroundRepeat: "no-repeat",
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
                          flexDirection: "column",
                          marginTop: 8,
                        }}
                      >
                        {route.component}
                      </Box>
                    </Box>
                  )}
                </ThemeProvider>
              </>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
