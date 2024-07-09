import { useEffect, useState } from "react";
import { Larp } from "../types";
import LarpAPI from "../util/api";



function useFetchLarps( filterObject:Partial<Larp> = {}):[Larp[], boolean, any] {
    const [larps, setLarps] = useState<Larp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();

    useEffect(() => {
        async function fetchLarps() {
            //TODO: add filtering
            try {
                const response = await LarpAPI.getAllLarps(null);
                setLarps(response);
                setLoading(false);
            } catch(err) {
                setError(err)
                setLoading(false)
            }
        }

        fetchLarps();
    }, [setLarps]);

    return [ larps, loading, error ];
}



export { useFetchLarps };