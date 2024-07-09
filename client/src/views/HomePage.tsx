import Carousel from "../components/ui/Carousel";
import Calendar from "../components/Calendar/Calendar";
import LarpDetails from "../components/Events/LarpDetails";
import { TestLarp1, TestLarp2, TestLarp3 } from '../data/LarpData';
import CategoryBar from "../components/Events/CategoryBar";

function HomePage() {
    return (
        <>
            <Calendar initialLarps={[TestLarp1, TestLarp2, TestLarp3]} />
            <CategoryBar larps={[TestLarp1,TestLarp2, TestLarp3, TestLarp1,TestLarp2, TestLarp3]} title="Featured Events"/>
            <CategoryBar larps={[TestLarp1,TestLarp2, TestLarp3, TestLarp1,TestLarp2, TestLarp3]} title="Events this Month"/>
        </>
    );
}

export default HomePage;