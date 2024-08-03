import Calendar from "../components/Calendar/Calendar";
import CategoryBar from "../components/Events/CategoryBar";
import { useFetchLarps } from "../hooks/useFetchLarps";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

function HomePage() {

    const { larps, loading, error } = useFetchLarps();

    return (
        <>
            {
                loading
                    ?
                    <LoadingSpinner />
                    :

                    <>
                        <ErrorMessage
                            title="Sorry, there was a problem fetching records for this page"
                            errs={error}
                        />
                        <Calendar larps={larps} />
                        <CategoryBar title="Featured Events" />
                        <CategoryBar title="Events this Month" />
                    </>
            }
        </>
    );
}

export default HomePage;