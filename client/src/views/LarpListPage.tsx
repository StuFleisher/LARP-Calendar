import LarpList from "../components/Events/LarpList";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useFetchLarps } from "../hooks/useFetchLarps";
import { useSearchParams } from "react-router-dom";


function LarpListPage() {

    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get("q") || null;

    const { larps, loading, error } = useFetchLarps(queryParam);


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