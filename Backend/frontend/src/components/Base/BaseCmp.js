import { useState, useEffect } from "react"
import Sidebar from "./Sidebar";
import Header from "./Header";
import Box from '@mui/material/Box';
import Menu from "./Menu";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme();
function Base(){
    return(
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
            <Header/>

            </Box>
            </ThemeProvider>
      );
}

export default Base;