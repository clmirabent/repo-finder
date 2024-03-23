import './App.css'

import { Routes, Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';

import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import toast, { Toaster } from 'react-hot-toast';

import RepositoryList from './pages/RepositoryList'
import MainDashboard from './pages/MainDashboard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container sx={{ minHeight: "100vh" }}>
        <BrowserRouter>
          <Toaster />
          <Routes>

            <Route path='/' element={<MainDashboard />} />
            <Route path='/repositories' element={<RepositoryList />} />

          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}



export default App
