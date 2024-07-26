import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Modal, Box } from "@mui/material";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EventForm from "../components/Forms/LarpForm";
import LarpAPI from "../util/api";
import { Organization, OrganizationForUpdate } from "../types";

import { OrgFormProvider } from "../context/OrgFormProvider";
import { useFetchOrg } from "../hooks/useFetchOrg";
import EditOrgSchema from "../components/Forms/EditOrgSchema";
import OrgForm from "../components/Forms/OrgForm";

function AdminEditOrg() {
    const { id } = useParams();
    if (!id) {
        throw new Error("Id is required to edit a larp");
    }

    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const { org, setOrg, loading, error } = useFetchOrg(parseInt(id));

    /** Convert data to maintain type safety */
    function orgToOrgForUpdate(): OrganizationForUpdate | null {
        if (org) {
            const { larps, isApproved, ...orgForUpdate } = org;
            return orgForUpdate;
        }
        return null;
    }
    const orgForUpdate = orgToOrgForUpdate();

    if (error) {
        //TODO: create error page
        console.error(error);
        navigate('admin/organizations');
    }

    /** Sends an API request to store a larp based on the current form values
  * Navigates to the larpDetail view upon success.
  */
    async function saveOrg(formData: OrganizationForUpdate) {
        setSaving(true);
        const savedOrg = await LarpAPI.UpdateOrg({
            ...formData,
        });
        setOrg(savedOrg);
        setSaving(false);
        // if (image) {
        //     await ParsleyAPI.updateRecipeImage(image, recipe.recipeId);
        // }
        // navigate(`/admin/events/${savedLarp.id}`);
    }

    return (
        !org
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
                <OrgFormProvider<OrganizationForUpdate>
                    onSubmitCallback={saveOrg}
                    org={orgForUpdate!}
                    schema={EditOrgSchema}
                >
                    <OrgForm />
                </OrgFormProvider>
            </>
    );
}

export default AdminEditOrg;