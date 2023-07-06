import React, {useEffect, useRef, useState } from "react";
import {Link} from "react-router-dom";
import styles from "./Sidebar.module.css";

import PropTypes from "prop-types";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import MuiDrawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import List from '@mui/material/List';
import MuiAppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase-config";
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import GroupIcon from '@mui/icons-material/Group';



const mainListItems = (
    <React.Fragment>
      <ListItemButton >
        <ListItemIcon>
          <DataThresholdingIcon />
        </ListItemIcon>
            <Button component={Link} to="/Home" >
                <ListItemText primary="데이터 조회" />
            </Button>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <StackedLineChartIcon />
        </ListItemIcon>
            <Button component={Link} to="/stats" >
                <ListItemText primary="통계 조회" />
            </Button>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
            <Button component={Link} to="/UserManagement" >
                <ListItemText primary="사용자관리" />
            </Button>
      </ListItemButton>
    </React.Fragment>
  );
  
 const secondaryListItems = (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton>
    </React.Fragment>
  );
  
  const drawerWidth = 240;
  const defaultTheme = createTheme();
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));


function Sidebar(){ 
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <ThemeProvider theme={defaultTheme}>
<AppBar position="absolute" open={open} sx={{ backgroundColor: 'green' }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Deeplant
            </Typography>
            <IconButton color="inherit" component={Link} to="/profile">
              <Badge color="secondary">
                <PersonIcon />
              </Badge>
              <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              프로필
            </Typography>
            </IconButton>

            <IconButton color="inherit" onClick={logout}>
              <Badge color="secondary">
                <LogoutIcon />
              </Badge>
              <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              로그아웃
            </Typography>
            </IconButton>
            
          </Toolbar>
        </AppBar>
       
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>

        </ThemeProvider>
    );
}

Sidebar.propTypes={
    width: PropTypes.number,
}

export default Sidebar;