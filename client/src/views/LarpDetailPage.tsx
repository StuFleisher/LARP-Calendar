import { Larp } from "../types"
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import LarpAPI from "../util/api";
import LarpDetails from "../components/Events/LarpDetails";
import { userContext } from "../context/userContext";
import Container from "@mui/material/Container";
import LoadingSpinner from "../components/ui/LoadingSpinner";


function LarpDetailPage (){
    const { id } = useParams();
    const { username } = useContext(userContext);

    const [larp, setLarp] = useState<Larp | null>(null);
    const navigate = useNavigate();

    useEffect(function fetchLarpOnMount() {
        async function fetchLarp() {
            try {
                if (id !== undefined) {
                    const numericId = parseInt(id);
                    const larpDetails = await LarpAPI.getLarpById(numericId);
                    console.log("fetched larp", larpDetails)
                    setLarp(larpDetails);
                }
            } catch (err) {
                navigate('/events');
            }
        }
        fetchLarp();

    }, [id, navigate]);

    return (

            <Container className="Page-container" maxWidth="xl">
                {!larp
                    ?
                    <LoadingSpinner />
                    :
                    <>
                        <LarpDetails larp={larp} />
                        {username !== larp.organizer ? "" : <Link to={`/events/${larp.id}/edit`}> Edit this Event</Link>}
                    </>}
            </Container>
    );
}

export default LarpDetailPage