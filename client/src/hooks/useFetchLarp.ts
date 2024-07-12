import { useEffect, useState } from "react";
import { Larp } from "../types";
import LarpAPI from "../util/api";


function useFetchLarp(id: number): [Larp | null, boolean, any] {
  const [larp, setLarp] = useState<Larp | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    async function fetchLarp() {
      try {
        const response = await LarpAPI.getLarpById(id);
        setLarp(response);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchLarp();
  }, [setLarp, id]);

  return [larp, loading, error];
}



export { useFetchLarp };