import './App.css';

import { ThemeProvider } from '@mui/material';
import theme from './styles/theme.tsx';
import { Box } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';
import RoutesList from './RoutesList.tsx';
import NavBar from './components/NavBar.tsx';


function App() {

  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <RoutesList />
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
