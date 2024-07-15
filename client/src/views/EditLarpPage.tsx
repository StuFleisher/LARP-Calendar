import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Modal, Box } from "@mui/material";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EventForm from "../components/Forms/LarpForm";
import LarpAPI from "../util/api";
import { Larp } from "../types";

import { LarpFormProvider } from "../context/LarpFormProvider";
import { userContext } from "../context/userContext";
import { useFetchLarp } from "../hooks/useFetchLarp";


function EditLarpPage() {

    const { id } = useParams();
    if (!id){
        throw new Error("Id is required to edit a larp")
    }

    const [saving, setSaving] = useState(false);
    const { username } = useContext(userContext);
    const navigate = useNavigate();
    const {larp, loading, error} = useFetchLarp(parseInt(id))

    if (error){
        //TODO: create error page
        console.error(error)
        navigate('/events')
    }

    /** Sends an API request to store a larp based on the current form values
  * Navigates to the larpDetail view upon success.
  */
    async function saveLarp(formData: Larp) {
        setSaving(true);
        console.log("submitting:", formData)
        const savedLarp = await LarpAPI.UpdateLarp({
            ...formData,
            organizer: username!,
        });
        console.log("response:",savedLarp)
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