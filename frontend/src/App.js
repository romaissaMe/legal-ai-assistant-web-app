import CssBaseline from '@mui/material/CssBaseline';
import React from 'react'
import "./styles.css";
import Chat from "./pages/Chat";
import { Box } from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import theme from "./Theme";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Topbar from "./components/Topbar";
import Toolbar from '@mui/material/Toolbar';
export default function App() {
  const [page,setPage] = React.useState('')
  return (
    <ThemeProvider theme={theme}>
      <Box className="App">
        <CssBaseline />
        <Topbar page={page}/>
        <Toolbar/>
        <Box sx={{height:'100%'}}>
          <Router>
           <Routes>
              <Route path='/' element={<Home setPage={setPage}/>}/>
              <Route path='/chat' element={<Chat setPage={setPage}/>}/>
            </Routes>
          </Router>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
