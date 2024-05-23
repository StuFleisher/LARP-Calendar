import './App.css';

import { ThemeProvider } from '@mui/material';
import theme from './styles/theme.tsx';

import EventDetails from './components/EventDetails';
import EventCard from './components/EventCard.tsx';
import Carousel from './components/Carousel.tsx';
import Calendar from './components/Calendar';

import { TestLarp1 } from './data/LarpData';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Carousel
          title="Featured Events"
        >
        <EventDetails larp={TestLarp1} />
        <EventDetails larp={TestLarp1} />
        <EventDetails larp={TestLarp1} />
        </Carousel>
        <br />
          <EventCard larp={TestLarp1} />
          <EventCard larp={TestLarp1} />
          <EventCard larp={TestLarp1} />
        {/* <Calendar/> */}
      </ThemeProvider>
    </>
  );
}

export default App;
