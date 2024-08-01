import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import EventForm from "../components/Forms/LarpForm";
import LarpAPI from "../util/api";
import { LarpForCreate } from "../types";

import { LarpFormProvider } from "../context/LarpFormProvider";
import { userContext } from "../context/userContext";
import ErrorMessage from "../components/ui/ErrorMessage";
import { Box, Modal } from "@mui/material";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type NewLarpPageProps = {
    initialLarp?: LarpForCreate;
};

const emptyLarp: LarpForCreate = {
    title: "",
    ticketStatus: "AVAILABLE",
    tags: [],
    start: new Date(),
    end: new Date(),
    allDay: false,
    city: "",
    country: "",
    language: "",
    description: "",
    orgId: 0,
    eventUrl: "",
};

function NewLarpPage({ initialLarp = emptyLarp }: NewLarpPageProps) {

    const { organization } = useContext(userContext);
    const [saving, setSaving] = useState(false);
    const [errs, setErrs] = useState<string[]>([]);
    const navigate = useNavigate();

    /** Sends an API request to store a larp based on the current form values
  * Navigates to the larpDetail view upon success.
  */
    async function saveLarp(formData: LarpForCreate) {
        try {
            setSaving(true);
            const savedLarp = await LarpAPI.createLarp({
                ...formData,
                orgId: organization!.id,
            });
            navigate(`/events/${savedLarp.id}/image?new=true`);
        } catch (e: any) {
            setErrs(e);
            setSaving(false);
        }
    }

    return (
        <>
            <ErrorMessage
                title="Sorry, there was a problem submitting the form"
                errs={errs}
            />
            {saving &&
                <Modal open={true}>
                    <Box className="LoadingSpinnerContainer">
                        <LoadingSpinner />
                    </Box>
                </Modal>
            }
            <LarpFormProvider<LarpForCreate> onSubmitCallback={saveLarp} larp={initialLarp}>
                <EventForm />
            </LarpFormProvider>
        </>
    );
}

export default NewLarpPage;