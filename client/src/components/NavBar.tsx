import { Box, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link as NavLink } from "react-router-dom";
import './NavBar.scss'


function NavBar() {
    return (
        <Box className="NavBar">
            <Stack direction="row" justifyContent='space-between'>
                <h2> LARP Calendar</h2>
                <Stack className="NavBar-hamburger" direction="row" justifyContent='center' alignItems='center'>
                    <FontAwesomeIcon icon={faBars}/>
                </Stack>
            </Stack>
        </Box>
    );
}

export default NavBar;