import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { Modal, Box } from "@mui/material";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EventForm from "../components/Forms/LarpForm";
import LarpAPI from "../util/api";
import { Larp } from "../types";

import { LarpFormProvider } from "../context/LarpFormProvider";
import { userContext } from "../context/userContext";


function EditLarpPage() {

    const { id } = useParams();
    const [larp, setLarp] = useState<Larp | null>(null);
    console.log(larp);
    const [saving, setSaving] = useState(false);
    const { username, isAdmin } = useContext(userContext);
    const navigate = useNavigate();



    useEffect(function fetchLarpOnMount() {
        async function fetchLarp() {
            try {
                if (id !== undefined) {
                    const numericId = parseInt(id);
                    const larpDetails = await LarpAPI.getLarpById(numericId);

                    if (larpDetails && (username !== larpDetails.organizer) && !isAdmin) {
                        console.warn("Not Authorized");
                        navigate(`/events/${id}`);
                    }

                    setLarp(larpDetails);
                }
            } catch (err) {
                setSaving(false);
                navigate('/events');
            }
        }
        fetchLarp();

    }, [id, navigate, isAdmin, username]);

    /** Sends an API request to store a larp based on the current form values
  * Navigates to the larpDetail view upon success.
  */
    async function saveLarp(formData: Larp) {
        setSaving(true);
        const savedLarp = await LarpAPI.UpdateLarp({
            ...formData,
            organizer: username!,
        });
        // if (image) {
        //     await ParsleyAPI.updateRecipeImage(image, recipe.recipeId);
        // }
        navigate(`/events/${savedLarp.id}`);
    }

     /** Callback to delete a larp and update the record */
     async function deleteLarp(): Promise<void> {
        console.log("deleteLarp");
        await LarpAPI.DeleteLarp(larp!.id);
        navigate(`/events/`);
    }

    return (
        !larp
            ?
            <LoadingSpinner />
            :
            <>
                {saving &&
                    <Modal open={true}>
                        <Box className="LoadingSpinnerContainer">
                            <LoadingSpinner />
                        </Box>
                    </Modal>
                }
                <LarpFormProvider<Larp> onSubmitCallback={saveLarp} larp={larp}>
                    <EventForm deleteLarp={deleteLarp}/>
                </LarpFormProvider>
            </>
    );
}

export default EditLarpPage;