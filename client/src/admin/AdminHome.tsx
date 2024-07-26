import { useState } from "react";
import { Stack, Drawer, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

const DRAWER_WIDTH = 150;

function AdminHome() {
    const [isOpen, setIsOpen] = useState(true);

    function toggleDrawer() {
        setIsOpen(() => !isOpen);
    }

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="Admin-pageContainer"
            sx={{
                height:'100%',
            }}
        >

            <Drawer
                className="adminNav"
                open={isOpen}
                variant="persistent"
                anchor="left"
                sx={{
                    width: `${DRAWER_WIDTH}`,
                    alignSelf: 'stretch',
                    '& .MuiDrawer-paper': {
                        width: isOpen ? `${DRAWER_WIDTH}px` : '0px',
                        position: 'relative', // Ensure it is positioned within the container
                        // border:'none'
                    },
                }}
            >
                <AdminNav />
            </Drawer>

            <Stack
                direction="row"
                alignItems="center"
                className="Admin-dashboardContainer"
                sx={{
                    flexGrow: 1,
                    width: isOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
                    height:'100%'
                }}
            >
                <IconButton
                    onClick={toggleDrawer}
                >
                    <FontAwesomeIcon icon={isOpen ? faChevronCircleLeft : faChevronCircleRight} />
                </IconButton>
                <Outlet />
            </Stack>
        </Stack>
    );

}

export default AdminHome;