import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

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
  start: DateTime.now(),
  end: DateTime.now(),
  allDay:false,
  imgUrl: "",
  city: "",
  country: "",
  language: "",
  description: "",
  organizer: "",
  eventUrl: "",
}

function NewLarpPage({initialLarp = emptyLarp}:NewLarpPageProps) {

    const [larp, setLarp] = useState<LarpForCreate>(initialLarp);

    const { username } = useContext(userContext);
    const navigate = useNavigate();


       /** Sends an API request to store a larp based on the current form values
     * Navigates to the larpDetail view upon success.
     */
       async function saveLarp(formData: LarpForCreate) {
        const savedLarp = await LarpAPI.createLarp({
            ...formData,
            organizer: username!,
        });
        // if (image) {
        //     await ParsleyAPI.updateRecipeImage(image, recipe.recipeId);
        // }
        navigate(`/events/${savedLarp.id}`);
    }

    return (
        <LarpFormProvider<LarpForCreate> onSubmitCallback={saveLarp} larp={larp}>
            <EventForm />
        </LarpFormProvider>
    );
}

export default NewLarpPage;