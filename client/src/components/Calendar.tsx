
import { Calendar as BigCalendar, luxonLocalizer } from 'react-big-calendar';
import {DateTime} from 'luxon';
import "./Calendar.scss"

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = luxonLocalizer(DateTime) // or globalizeLocalizer
const myEventsList:[] = [];

const Calendar = () => (
  <div className="myCustomHeight" style={{height:"500px"}}>
    <BigCalendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

export default Calendar