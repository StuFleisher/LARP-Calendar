import { useFetchLarps } from "../hooks/useFetchLarps";
import { Box, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { JSDateToLuxon } from "../util/typeConverters";
import AvailabilityIcon from "./AvailabilityIcon";
import LarpAPI from "../util/api";
import DeleteLarpButton from "../components/FormComponents/DeleteLarpButton";
import EditLarpButton from "../components/FormComponents/EditLarpButton";
import { useNavigate } from "react-router-dom";

function LarpsDashboard() {
    const { larps, setLarps, loading, error } = useFetchLarps();
    const navigate = useNavigate();

    async function handleDelete(id: number) {
        await LarpAPI.DeleteLarp(id);
        setLarps(() => (
            larps.filter((larp) => larp.id !== id)
        ));
    }

    async function handleDuplicate(id:number) {
        const fetchedLarp = await LarpAPI.getLarpById(id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id:_,...larpForCreate} = fetchedLarp;
        const createdLarp = await LarpAPI.createLarp(larpForCreate);
        setLarps(()=>[...larps, createdLarp])
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 50 },
        { field: 'title', headerName: 'Title', flex: 1, },
        { field: 'organizer', headerName: 'Organizer' },
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
            width:200,
            getActions: (params) => {
                return [
                        <DeleteLarpButton handleDelete={()=>handleDelete(params.row.id)}/>,
                        <EditLarpButton handleClick={()=>navigate(`/events/${params.row.id}/edit`)}/>,
                        <IconButton onClick={()=>{handleDuplicate(params.row.id)}}><FontAwesomeIcon icon={faCopy}/></IconButton>
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
        <Box sx={{ height: '90vh' }}>
            <DataGrid columns={columns} rows={rows} />
        </Box>
    );

}

export default LarpsDashboard;