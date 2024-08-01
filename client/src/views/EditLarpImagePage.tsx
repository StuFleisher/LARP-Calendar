import { useContext } from "react";
import { userContext } from "../context/userContext";
import { useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import LarpAPI from "../util/api";
import { Box, Stack, Typography } from "@mui/material";
import { useFetchLarp } from "../hooks/useFetchLarp";
import ImageForm from "../components/Forms/EditImageForm";
import { boolean } from "yup";


function EditLarpImagePage() {

    const { username, isAdmin } = useContext(userContext);

    const { id } = useParams();
    if (!id) {
        throw new Error("Id is required to edit a larp");
    }

    const location = useLocation();
    const newLarp = new URLSearchParams(location.search).get('new');

    const { larp, loading, error } = useFetchLarp(parseInt(id));
    const navigate = useNavigate();

    //TODO: move auth checks to custom hook
    if (!loading && username !== larp?.organization.username && !isAdmin) {
        console.error("You are not authorized to edit this record")
        return <Navigate to={`events/${id}`} />;
    }

    async function handleSubmit(image:Blob, id:number) {
            await LarpAPI.updateLarpImage(image, id);
            navigate(`/events/${id}`);
    }

    return (
        <Stack direction={'column'} alignItems={'center'} spacing={3}>
            <Box
                sx={{
                    padding: '1rem',
                    paddingTop: '3rem',
                    textAlign: 'center',
                }}
            >
                <Typography variant={'h1'} component={'h2'}>
                    {newLarp ? "You're almost done": "Add an event banner"}
                </Typography>
                <Typography>
                    Upload an image for your event using the form below
                </Typography>
            </Box>
            {larp &&
                <ImageForm model={larp} submitCallback={handleSubmit} />
            }
        </Stack>
    );
}

export default EditLarpImagePage;