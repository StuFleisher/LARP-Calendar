import { useEffect, useState } from "react";
import { Larp } from "../types";
import LarpAPI from "../util/api";

type FetchLarpsResult = {
    larps:Larp[],
    setLarps: React.Dispatch<React.SetStateAction<Larp[]>>,
    loading:boolean,
    error:any,
}

// function useFetchLarps( filterObject:Partial<Larp> = {}):FetchLarpsResult {
function useFetchLarps():FetchLarpsResult {
    const [larps, setLarps] = useState<Larp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string[]>([]);

    useEffect(() => {
        async function fetchLarps() {
            //TODO: add filtering
            try {
                const response = await LarpAPI.getAllLarps(null);
                setLarps(response);
                setLoading(false);
            } catch(err:any) {
                setError(err)
                setLoading(false)
            }
        }

        fetchLarps();
    }, [setLarps]);

    return {
        larps,
        setLarps,
        loading,
        error };
}



export { useFetchLarps };