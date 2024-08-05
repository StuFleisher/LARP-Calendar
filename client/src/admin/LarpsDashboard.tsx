import { useFetchLarps } from "../hooks/useFetchLarps";
import { Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { JSDateToLuxon } from "../util/typeConverters";
import AvailabilityIcon from "./AvailabilityIcon";
import LarpAPI from "../util/api";
import DeleteButton from "../components/FormComponents/DeleteButton";
import EditButton from "../components/FormComponents/EditButton";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

function LarpsDashboard() {
    const { larps, setLarps, loading, error } = useFetchLarps();
    const navigate = useNavigate();

    async function handleDelete(id: number) {
        await LarpAPI.DeleteLarp(id);
        setLarps(() => (
            larps.filter((larp) => larp.id !== id)
        ));
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 50 },
        { field: 'title', headerName: 'Title', flex: 1, },
        {
            field: 'organization', headerName: 'Organization',
            renderCell: (params) => {
                return (
                    <Link component={RouterLink} to={`/admin/orgs/${params.value.id}`}>
                        {params.value.orgName}
                    </Link>
                );
            },
        },
        {
            field: 'start', headerName: 'Start', type: "date",
            renderCell: (params) => {
                return JSDateToLuxon(params.value).toLocaleString({
                    month: 'short',
                    day: 'numeric',
                });
            }
        },
        {
            field: 'end', headerName: 'End', type: "date",
            renderCell: (params) => {
                return JSDateToLuxon(params.value).toLocaleString({
                    month: 'short',
                    day: 'numeric',
                });
            }
        },
        {
            field: 'ticketStatus', headerName: 'Ticket Status',
            align: "center",
            renderCell: (params) => <AvailabilityIcon status={params.value} />
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            getActions: (params) => {
                return [
                    <IconButton component={RouterLink} to={`/admin/events/${params.row.id}`}>
                        <FontAwesomeIcon icon={faEye} />
                    </IconButton>,
                    <DeleteButton handleDelete={() => handleDelete(params.row.id)} />,
                    <EditButton handleClick={() => navigate(`/admin/events/${params.row.id}/edit`)} />,
                ];
            }
        },
    ];

    const rows: GridRowsProp = larps.map((larp) => (
        {
            ...larp
        }
    ));


    return (

        loading
            ?
            <LoadingSpinner />
            :
            <>
                <ErrorMessage
                    title="Sorry, there was a problem loading your data"
                    errs={error}
                />
                <Box sx={{
                    height: '85dvh',
                    width: '100%',
                }}>
                    <DataGrid columns={columns} rows={rows} />
                </Box>
            </>

    );

}

export default LarpsDashboard;