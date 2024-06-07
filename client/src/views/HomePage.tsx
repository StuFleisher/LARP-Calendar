import Carousel from "../components/Carousel";
import Calendar from "../components/Calendar/Calendar";
import EventDetails from "../components/Events/EventDetails";
import EventCard from "../components/Events/EventCard";
import { TestLarp1, TestLarp2, TestLarp3 } from '../data/LarpData';

function HomePage() {
    return (
        <>
            <Calendar larps={[TestLarp1, TestLarp2, TestLarp3]} />
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
        </>
    );
}

export default HomePage;