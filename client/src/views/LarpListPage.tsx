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

                <LarpList larps={larps} />
            </>

    );
}

export default LarpListPage;