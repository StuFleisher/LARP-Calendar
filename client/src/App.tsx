import './App.css'

import EventCard from './components/EventCard'
import Calendar from './components/Calendar'

import { TestLarp1 } from './data/LarpData'

function App() {

  return (
    <>
    <EventCard larp={TestLarp1}/>
      {/* <Calendar/> */}
    </>
  )
}

export default App
