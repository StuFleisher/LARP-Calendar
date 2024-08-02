
import { useParams, useNavigate } from "react-router-dom";
import { useFetchOrg } from "../hooks/useFetchOrg";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import OrgDetails from "../components/Orgs/OrgDetails";
import { Alert } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@mui/material";



function OrgDetailPage() {

    const navigate = useNavigate();
    const { id } = useParams();
    if (!id) {
        throw new Error("Id is required to view details page for an organization");
    }

    const { org, error, loading } = useFetchOrg(+id);

    if (loading) return (<LoadingSpinner />);

    if (org) return (
        <>
            {!org.isApproved &&
                <Alert severity="success" icon={<FontAwesomeIcon icon={faCheck} />}>
                    Your application is currently being reviewed by our admin team. Once your application has been approved you will be able to publish events. Send questions to <Link to="mailto:info@larpcalendar.com">info@larpcalendar.com</Link>
                </Alert>
            }
            <OrgDetails org={org} />
        </>
    );

}


export default OrgDetailPage;