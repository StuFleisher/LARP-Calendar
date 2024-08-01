import { useState, useContext } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { Modal, Box } from "@mui/material";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EventForm from "../components/Forms/LarpForm";
import LarpAPI from "../util/api";
import { LarpForUpdate } from "../types";
import { LarpFormProvider } from "../context/LarpFormProvider";
import { useFetchLarp } from "../hooks/useFetchLarp";

const DEFAULT_IMG_URL = "https://sf-larpcal.s3.amazonaws.com/larpImage/default-sm";


function EditLarpPage() {

    const { username, isAdmin } = useContext(userContext);
    const { id } = useParams();
    if (!id) {
        throw new Error("Id is required to edit a larp");
    }

    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const { larp, loading, error } = useFetchLarp(parseInt(id));

    if (username !== larp?.organization.username && !isAdmin) {
        return <Navigate to={`events/${id}`} />;
    }

    if (error) {
        //TODO: create error page
        console.error(error);
        navigate('/events');
    }

    /** Sends an API request to store a larp based on the current form values
  * Navigates to the larpDetail view upon success.
  */
    async function saveLarp(formData: LarpForUpdate) {
        setSaving(true);
        const savedLarp = await LarpAPI.UpdateLarp({
            ...formData,
        });

        navigate(
            savedLarp.imgUrl.sm === DEFAULT_IMG_URL
                ?
                `/events/${savedLarp.id}/image?new=true`
                :
                `/events/${savedLarp.id}`
        );
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
                <LarpFormProvider<LarpForUpdate> onSubmitCallback={saveLarp} larp={larp as LarpForUpdate}>
                    <EventForm />
                </LarpFormProvider>
            </>
    );
}

export default EditLarpPage;