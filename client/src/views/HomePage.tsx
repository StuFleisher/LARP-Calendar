import Carousel from "../components/ui/Carousel";
import Calendar from "../components/Calendar/Calendar";
import LarpDetails from "../components/Events/LarpDetails";
import LarpCard from "../components/Events/LarpCard";
import { TestLarp1, TestLarp2, TestLarp3 } from '../data/LarpData';

function HomePage() {
    return (
        <>
            <Calendar initialLarps={[TestLarp1, TestLarp2, TestLarp3]} />
            <Carousel
                title="Featured Events"
            >
                <LarpDetails larp={TestLarp1} />
                <LarpDetails larp={TestLarp2} />
                <LarpDetails larp={TestLarp3} />
            </Carousel>
            <br />
            <LarpCard larp={TestLarp1} />
            <LarpCard larp={TestLarp2} />
            <LarpCard larp={TestLarp3} />
        </>
    );
}

export default HomePage;