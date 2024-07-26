import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import { useFetchOrg } from "../hooks/useFetchOrg";
import { OrganizationForUpdate } from "../types";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LarpAPI from "../util/api";
import { OrgFormProvider } from "../context/OrgFormProvider";
import OrgForm from "../components/Forms/OrgForm";
import { Box, Modal } from "@mui/material";
import EditOrgSchema from "../components/Forms/EditOrgSchema";

function EditOrgPage() {

    const { username, isAdmin } = useContext(userContext);
    const { id } = useParams();
    if (!id) {
        throw new Error("Id is required to view details page for an organization");
    }
    const { org, error, loading } = useFetchOrg(+id);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    /** Auth check --> Is this the user's Organization
     * Note that this check allows edits to organizer data prior to
     * account approval by admins.
    */
    if (org && username !== org?.username && !isAdmin) {
        return <Navigate to={`/orgs/${id}`} />;
    }

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
        navigate(`/orgs/${id}`);
    }

    async function saveOrg(formData: OrganizationForUpdate) {
        setSaving(true);
        const savedOrg = await LarpAPI.UpdateOrg({
            ...formData,
        });
        navigate(`/orgs/${savedOrg.id}`);
    }


    return (

        loading
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

export default EditOrgPage;