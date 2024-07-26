
import { useParams, useNavigate } from "react-router-dom";
import { useFetchOrg } from "../hooks/useFetchOrg";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import OrgDetails from "../components/Orgs/OrgDetails";




function OrgDetailPage() {

    const navigate = useNavigate();
    const { id } = useParams();
    if (!id) {
        throw new Error("Id is required to view details page for an organization");
    }

    const { org, error, loading } = useFetchOrg(+id);

    if (error) {
        //TODO: create error page
        console.error(error);
        navigate('/events');
    }

    if (loading) return (<LoadingSpinner />);

    if (org) return (
        <OrgDetails org={org}/>
    );

}


export default OrgDetailPage;