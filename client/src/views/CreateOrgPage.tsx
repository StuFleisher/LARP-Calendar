import { useContext, useState } from "react";
import LarpAPI from "../util/api";
import { Navigate, useNavigate } from "react-router-dom";
import { OrganizationForCreate } from "../types";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { OrgFormProvider } from "../context/OrgFormProvider";
import { Modal, Box } from "@mui/material";
import { userContext } from "../context/userContext";
import OrgForm from "../components/Forms/OrgForm";
import CreateOrgSchema from "../components/Forms/CreateOrgSchema";


function CreateOrgPage() {

    const user = useContext(userContext);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    if (!user.username) {return <Navigate to="/auth/login"/>}

    const EMPTY_ORG: OrganizationForCreate = {
        orgName: "",
        orgUrl: "",
        description: "",
        email: "",
        username: user.username,
    };

    async function saveOrg(formData: OrganizationForCreate) {
        setSaving(true);
        const savedOrg = await LarpAPI.CreateOrganization({
            ...formData,
        });
        navigate(`/orgs/${savedOrg.id}`);
    }

    return (
            <>
                {saving &&
                    <Modal open={true}>
                        <Box className="LoadingSpinnerContainer">
                            <LoadingSpinner />
                        </Box>
                    </Modal>
                }

                <OrgFormProvider<OrganizationForCreate>
                 onSubmitCallback={saveOrg}
                 org={EMPTY_ORG}
                 schema={CreateOrgSchema}
                 >
                    <OrgForm />
                </OrgFormProvider>
            </>
    )
}

export default CreateOrgPage;