import {  useContext } from "react";
import { useNavigate } from "react-router-dom";

import EventForm from "../components/Forms/LarpForm";
import LarpAPI from "../util/api";
import { LarpForCreate } from "../types";

import { LarpFormProvider } from "../context/LarpFormProvider";
import { userContext } from "../context/userContext";

type NewLarpPageProps = {
    initialLarp?: LarpForCreate;
};

const emptyLarp:LarpForCreate = {
  title: "",
  ticketStatus: "AVAILABLE",
  tags: [],
  start: new Date(),
  end: new Date(),
  allDay:false,
  city: "",
  country: "",
  language: "",
  description: "",
  orgId: 0,
  eventUrl: "",
}

function NewLarpPage({initialLarp = emptyLarp}:NewLarpPageProps) {

    const { organization } = useContext(userContext);
    const navigate = useNavigate();


       /** Sends an API request to store a larp based on the current form values
     * Navigates to the larpDetail view upon success.
     */
       async function saveLarp(formData: LarpForCreate) {
        const savedLarp = await LarpAPI.createLarp({
            ...formData,
            orgId: organization!.id,
        });

        navigate(`/events/${savedLarp.id}/image?new=true`);
    }

    return (
        <LarpFormProvider<LarpForCreate> onSubmitCallback={saveLarp} larp={initialLarp}>
            <EventForm />
        </LarpFormProvider>
    );
}

export default NewLarpPage;