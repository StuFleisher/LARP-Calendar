import './App.css';

import { ThemeProvider } from '@mui/material';
import theme from './styles/theme.tsx';

import EventCard from './components/EventCard';
import Calendar from './components/Calendar';

import { TestLarp1 } from './data/LarpData';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <EventCard larp={TestLarp1} />
        {/* <Calendar/> */}
      </ThemeProvider>
    </>
  );
}

export default App;
