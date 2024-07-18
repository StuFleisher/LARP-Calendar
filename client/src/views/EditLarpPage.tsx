import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Modal, Box } from "@mui/material";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EventForm from "../components/Forms/LarpForm";
import LarpAPI from "../util/api";
import { LarpForUpdate } from "../types";

import { LarpFormProvider } from "../context/LarpFormProvider";
import { useFetchLarp } from "../hooks/useFetchLarp";


function EditLarpPage() {

    const { id } = useParams();
    if (!id){
        throw new Error("Id is required to edit a larp")
    }

    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const {larp, loading, error} = useFetchLarp(parseInt(id))


    function larpToLarpForUpdate():LarpForUpdate | null{
        if (larp){
            const {orgId, organization, ...larpForUpdate} = larp;
            return larpForUpdate
        }
        return null;
    }
    const larpForUpdate = larpToLarpForUpdate();


    if (error){
        //TODO: create error page
        console.error(error)
        navigate('/events')
    }

    /** Sends an API request to store a larp based on the current form values
  * Navigates to the larpDetail view upon success.
  */
    async function saveLarp(formData: LarpForUpdate) {
        console.log(formData)
        setSaving(true);
        const savedLarp = await LarpAPI.UpdateLarp({
            ...formData,
        });
        // if (image) {
        //     await ParsleyAPI.updateRecipeImage(image, recipe.recipeId);
        // }
        navigate(`/events/${savedLarp.id}`);
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
                <LarpFormProvider<LarpForUpdate> onSubmitCallback={saveLarp} larp={larpForUpdate!}>
                    <EventForm/>
                </LarpFormProvider>
            </>
    );
}

export default EditLarpPage;