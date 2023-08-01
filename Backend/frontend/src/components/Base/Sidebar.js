import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// import mui component
import {
  ListItemButton,
  Button,
  ListItemIcon,
  Typography,
  ListItemText,
  Badge,
  List,
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
// import icons
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import { HiOutlineChip } from "react-icons/hi";

import DeeplantLong from "../../src_assets/Deeplant_long.webp";

const mainListItems = [
  {
    label: "홈",
    icon: <HomeIcon sx={{ fontSize: 30 }} />,
    path: "/Home",
  },
  {
    label: "대시보드",
    icon: <DataThresholdingIcon sx={{ fontSize: 30 }} />,
    path: "/DataManage",
  },
  {
    label: "데이터 예측",
    icon: <HiOutlineChip style={{ fontSize: 30 }} />,
    path: "/PA",
  },
  {
    label: "통계 분석",
    icon: <StackedLineChartIcon sx={{ fontSize: 30 }} />,
    path: "/stats",
  },
  {
    label: "사용자 관리",
    icon: <GroupIcon sx={{ fontSize: 30 }} />,
    path: "/UserManagement",
  },
];

const drawerWidth = 240;
const defaultTheme = createTheme();

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    backgroundColor: "#e0e2e4",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(8.3),
      },
    }),
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#cfe0e8",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = new URLSearchParams(location.search).get("userId");
  const [username, setUsername] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logout = async () => {
    try {
      console.log(userEmail);
      fetch(`http://3.38.52.82/user/logout?id=${userEmail}`);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const TestFunction = async () => {
    try {
      const response = await fetch(
        `http://3.38.52.82//user?userId=${userEmail}`
      );
      console.log(userEmail);
      const user = await response.json();
      setUsername(user.name); // Update the state with the username
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    TestFunction();
  }, [location]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>
            <Link to="/Home">
              <img src={DeeplantLong} alt="Deeplant Logo" height="70" />
            </Link>
          </Typography>
          <IconButton component={Link} to="/profile">
            <Badge color="secondary">
              <PersonIcon />
            </Badge>
            {username ? (
              <Typography
                component="h1"
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {username}님
              </Typography>
            ) : (
              <Typography component="span" variant="body1" sx={{ flexGrow: 1 }}>
                Loading... {/* or any loading message */}
              </Typography>
            )}
          </IconButton>

          <IconButton onClick={logout}>
            <Badge color="secondary">
              <LogoutIcon />
            </Badge>
            <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1 }}>
              로그아웃
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems.map((item) => (
            <Tooltip title={item.label} placement="right" arrow>
              <ListItemButton
                key={item.label}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  marginBottom: 1,
                  ...(location.pathname === item.path && {
                    "& .MuiSvgIcon-root, .MuiTypography-root": {
                      color: "#87bdd8",
                    },
                  }),
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Button>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ color: "textPrimary" }}
                  />
                </Button>
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
}

Sidebar.propTypes = {
  width: PropTypes.number,
};

export default Sidebar;
