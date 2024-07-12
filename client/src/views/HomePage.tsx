import Carousel from "../components/ui/Carousel";
import Calendar from "../components/Calendar/Calendar";
import { TestLarp1, TestLarp2, TestLarp3 } from '../data/LarpData';
import CategoryBar from "../components/Events/CategoryBar";
import { useFetchLarps } from "../hooks/useFetchLarps";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function HomePage() {

    const [larps, loading, error] = useFetchLarps();

    return (
        <>
            {
                larps
                    ?
                    <>
                        <Calendar larps={larps} />
                        <CategoryBar title="Featured Events" />
                        <CategoryBar title="Events this Month" />
                    </>
                    :
                    <LoadingSpinner />
            }
        </>
    );
}

export default HomePage;