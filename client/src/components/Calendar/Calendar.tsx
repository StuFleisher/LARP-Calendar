import { Larp } from '../../types';
import { Calendar as BigCalendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime } from 'luxon';

import { Box, Modal } from "@mui/material";
import { useState } from 'react';
import EventDetails from '../Events/EventDetails';
import { EventProps } from 'react-big-calendar';

import "./Calendar.scss";
import CalendarEvent from './CalendarEvent';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = luxonLocalizer(DateTime); // or globalizeLocalizer


type CalendarProps = {
  larps: Larp[];
};

function Calendar({ larps }: CalendarProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selected, setSelected] = useState<Larp | null>(null);


  return (
    <Box className="Calendar" style={{ position: 'relative' }}>
      <Modal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box>
          <EventDetails
            larp={selected as Larp}
          />
        </Box>
      </Modal>

      <BigCalendar
        localizer={localizer}
        events={larps}
        views={['month','week']}
        startAccessor="start"
        endAccessor="end"
        components={{
          event: (props: EventProps<Larp>) => (
            <CalendarEvent {...props} />
          )
        }}
        onSelectEvent={(larp) => {
          setSelected(larp);
          setShowDetails(true);
        }}
      />
    </Box>
  );
}

export default Calendar;