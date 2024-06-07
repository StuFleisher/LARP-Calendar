import './App.css';

import { ThemeProvider } from '@mui/material';
import theme from './styles/theme.tsx';

import EventDetails from './components/EventDetails';
import EventCard from './components/EventCard.tsx';
import Carousel from './components/Carousel.tsx';
import Calendar from './components/Calendar';

import { TestLarp1, TestLarp2, TestLarp3 } from './data/LarpData';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Calendar
          larps={[TestLarp1,TestLarp2, TestLarp3]}
        />
        <Carousel
          title="Featured Events"
        >
        <EventDetails larp={TestLarp1} />
        <EventDetails larp={TestLarp2} />
        <EventDetails larp={TestLarp3} />
        </Carousel>
        <br />
          <EventCard larp={TestLarp1} />
          <EventCard larp={TestLarp2} />
          <EventCard larp={TestLarp3} />
        {/* <Calendar/> */}
      </ThemeProvider>
    </>
  );
}

export default App;
