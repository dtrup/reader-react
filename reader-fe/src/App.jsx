import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Texts from './components/Texts'
import About from "./components/About"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import NoMatch from "./components/NoMatch"
import Chapter from "./components/Chapter"
import Container from "@mui/material/Container"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Paper from '@mui/material/Paper';



function App() {

    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <div className="App">
                    <Container sx={{ paddingLeft: { xs: 0, md: 10 }, paddingRight: { xs: 0, md: 10 } }}>
                    <Paper elevation={0} >
                        <Navbar />

                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path='/about' element={<About />} />
                            <Route path='/texts' element={<Texts />} />
                            <Route path='/text/:textId/' element={<Chapter />} />
                            <Route path='*' element={<NoMatch />} />
                        </Routes>
                        <Footer/>
                        </Paper>
                    </Container>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

    )
}

export default App
