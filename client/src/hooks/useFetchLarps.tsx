import { useEffect, useState } from "react";
import { Larp, LarpQuery } from "../types";
import LarpAPI from "../util/api";

type FetchLarpsResult = {
    larps: Larp[],
    setLarps: React.Dispatch<React.SetStateAction<Larp[]>>,
    loading: boolean,
    error: any,
};

function useFetchLarps(queryObject: LarpQuery | null): FetchLarpsResult {
    // function useFetchLarps():FetchLarpsResult {
    const [larps, setLarps] = useState<Larp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string[]>([]);

    useEffect(() => {
        async function fetchLarps() {
            try {
                const encodedQuery = queryObject && btoa(JSON.stringify(queryObject));
                const response = await LarpAPI.getAllLarps(encodedQuery);
                setLarps(response);
                setLoading(false);
            } catch (err: any) {
                setError(err);
                setLoading(false);
            }
        }

        fetchLarps();
    }, [setLarps, queryObject]);

    return {
        larps,
        setLarps,
        loading,
        error
    };
}



export { useFetchLarps };