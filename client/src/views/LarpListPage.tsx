import LarpList from "../components/Events/LarpList";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useFetchLarps } from "../hooks/useFetchLarps";



function LarpListPage() {
    const { larps, loading, error } = useFetchLarps();

    return (
        loading
            ?
            <LoadingSpinner />
            :
            <>
                <ErrorMessage
                    title="Sorry, there was a problem fetching records for this page"
                    errs={error}
                />
                {loading && <h1>fetching larp data</h1>}
                {error && <h1>There was an error</h1>}

                <LarpList larps={larps} />
            </>

    );
}

export default LarpListPage;