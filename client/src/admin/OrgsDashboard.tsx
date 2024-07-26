import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import LarpAPI from "../util/api";
import DeleteButton from "../components/FormComponents/DeleteButton";
import EditButton from "../components/FormComponents/EditButton";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { useFetchOrgs } from "../hooks/useFetchOrgs";
import ApproveButton from "../components/FormComponents/ApproveButton";

function OrgsDashboard() {
    const { orgs, setOrgs, loading, error } = useFetchOrgs();
    const navigate = useNavigate();

    async function handleDelete(id: number) {
        await LarpAPI.DeleteOrg(id);
        setOrgs(() => (
            orgs.filter((org) => org.id !== id)
        ));
    }

    async function handleApprove(id: number, isApproved:boolean){
        const updatedOrg = await LarpAPI.UpdateOrgApproval(id,isApproved);
        setOrgs(()=>{
            return orgs.map((org)=>(
                org.id===id
                ?
                    updatedOrg
                :
                    org
            ))
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 50 },
        {
            field: 'orgName', headerName: 'Name', flex: 1,
            renderCell: (params) => {
                return (
                    <Link component={RouterLink} to={`/admin/organizations/${params.row.id}`}>
                        {params.row.orgName}
                    </Link>
                );
            },

        },
        {
            field: 'username', headerName: 'Account',
        },
        {
            field: 'email', headerName: 'email', flex: 1,
            renderCell: (params) => {
                return (
                    <Link component={RouterLink} to={`mailto:${params.row.email}`}>
                        {params.row.email}
                    </Link>
                );
            }
        },
        {
            field: 'isApproved', headerName: 'Status',
            align: "center",
            renderCell: (params) => {
                return (
                    params.row.isApproved
                        ?
                        <Typography variant="details1" color="success.main"> Approved </Typography>
                        :
                        <Typography variant="details1" color="error.main"> Not Approved </Typography>)
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 200,
            getActions: (params) => {
                return [
                    <DeleteButton handleDelete={() => handleDelete(params.row.id)} />,
                    <EditButton handleClick={() => navigate(`${params.row.id}`)} />,
                    <ApproveButton handleClick={()=> handleApprove(params.row.id, !params.row.isApproved)}/>
                ]
            }
        },
    ];

    const rows: GridRowsProp = orgs.map((org) => (
        {
            ...org
        }
    ));


    return (
        <Box sx={{
            height: '85dvh',
            width: '100%',
        }}>
            <DataGrid columns={columns} rows={rows}
                initialState={{
                    sorting:{
                        sortModel:[{
                            field:'isApproved',
                            sort:'asc'
                        }]
                    }
                }}
            />
        </Box>
    );

}

export default OrgsDashboard;