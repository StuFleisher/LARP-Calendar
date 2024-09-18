import React, { useEffect, useState } from "react";
import { Larp } from "../types";
import LarpAPI from "../util/api";

type FetchLarpsResult = {
    larps: Larp[],
    setLarps: React.Dispatch<React.SetStateAction<Larp[]>>,
    loading: boolean,
    error: any,
};

/**
 * Manages fetching and stores state for a Larp[]
 *
 * @props query: a LarpQuery stringified and encoded to Base64
 */
function useFetchLarps(queryString: string | null): FetchLarpsResult {
    const [larps, setLarps] = useState<Larp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string[]>([]);

    useEffect(() => {
        async function fetchLarps() {
            try {
                const response = await LarpAPI.getAllLarps(queryString);
                setLarps(response);
                setLoading(false);
            } catch (err: any) {
                setError(err);
                setLoading(false);
            }
        }

        fetchLarps();
    }, [setLarps, queryString]);

    return {
        larps,
        setLarps,
        loading,
        error,
    };
}



export { useFetchLarps };