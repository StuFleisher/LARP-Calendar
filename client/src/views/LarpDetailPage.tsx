import { useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LarpDetails from "../components/Events/LarpDetails";
import { userContext } from "../context/userContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useFetchLarp } from "../hooks/useFetchLarp";


function LarpDetailPage (){
    const navigate = useNavigate();
    const { id } = useParams();

    if (!id) {
        throw new Error("Id is required in url params to load event details")
    }

    const {larp, loading, error} = useFetchLarp(parseInt(id))
    const { username } = useContext(userContext);

    return (

            <>
                {!larp
                    ?
                    <LoadingSpinner />
                    :
                    <>
                        <LarpDetails larp={larp} />
                    </>}
            </>
    );
}

export default LarpDetailPage