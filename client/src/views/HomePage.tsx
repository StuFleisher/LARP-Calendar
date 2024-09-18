import Calendar from "../components/Calendar/Calendar";
import CategoryBar from "../components/Events/CategoryBar";
import { useFetchLarps } from "../hooks/useFetchLarps";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { DateTime } from "luxon";

function HomePage() {

    const { larps, loading, error } = useFetchLarps(null);

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
                        <CategoryBar
                            title="Featured Events"
                            filterSet={{
                                startAfter:DateTime.now().toISO(),
                                isFeatured:true,
                            }}
                        />

                        <Calendar larps={larps} />

                        <CategoryBar
                            title="Events this Month"
                            filterSet={{
                                startAfter:DateTime.now().toISO(),
                                startBefore:DateTime.now().endOf("month").toISO()
                            }}

                        />
                        <CategoryBar
                            title="Events next Month"
                            filterSet={{
                                startAfter:DateTime.now().plus({month:1}).startOf("month").toISO(),
                                startBefore:DateTime.now().plus({month:1}).endOf("month").toISO()
                            }}
                        />
                        <CategoryBar
                            title="Family friendly events"
                            filterSet={{
                                startAfter:DateTime.now().toISO(),
                                tags:"family friendly"
                            }}
                        />
                    </>
            }
        </>
    );
}

export default HomePage;