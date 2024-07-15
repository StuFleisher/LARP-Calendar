import LarpList from "../components/Events/LarpList";
import { useFetchLarps } from "../hooks/useFetchLarps";



function LarpListPage() {
    const {larps, loading, error} = useFetchLarps();

    return (
        <>
            {loading && <h1>fetching larp data</h1>}
            {error && <h1>There was an error</h1>}

            <LarpList larps={larps}/>
        </>

    );
}

export default LarpListPage;