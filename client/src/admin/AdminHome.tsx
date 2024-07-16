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
            className="adminNav"
            direction="row"
            justifyContent="center"
            alignItems="center"
        >

            <Drawer
                open={isOpen}
                variant="persistent"
                anchor="left"
                sx={{
                    width: `${DRAWER_WIDTH}`,
                    alignSelf:'stretch',
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
                sx={{
                    flexGrow: 1,
                    width: isOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',

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