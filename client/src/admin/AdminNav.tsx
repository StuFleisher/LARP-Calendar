import { Stack, Link, ListItem, List } from "@mui/material";
import { Link as NavLink } from "react-router-dom";

function AdminNav() {


    return (
        <Stack
            className="adminNav"
            justifyContent={"center"}
            alignItems="center"
            direction="column"
            sx={{
                '& .MuiPaper-root':{
                    border:'none'
                }
            }}
        >
            <List>
                <ListItem>
                    <Link component={NavLink} to='/admin/events'>Events</Link>
                </ListItem>
                <ListItem>
                    <Link component={NavLink} to='/admin/users'>Users</Link>
                </ListItem>
                <ListItem>
                    <Link component={NavLink} to='/admin/orgs'>Organizers</Link>
                </ListItem>
            </List>
        </Stack>
    );

}

export default AdminNav;