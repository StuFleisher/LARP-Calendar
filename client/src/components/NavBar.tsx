import { useState, useRef } from "react";
import { Box, Stack, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './NavBar.scss';
import { NavLink } from "react-router-dom";
import { UserLoginData } from "../types";

const MENU_ITEMS = [
    "Home",
    "Calendar",
    "Events",
    "Search",
    "About",
];

type NavBarProps = {
    login: (credentials: UserLoginData) => Promise<void>;
}

function NavBar({props}:NavBarProps) {

    const [showMenu, setShowMenu] = useState(false);
    const anchorEl = useRef(null);

    return (
        <>
            <Box className="NavBar">
                <Stack direction="row" justifyContent='space-between'>
                    <h2> LARP Calendar</h2>
                    <Stack className="NavBar-menuIcon" direction="column" justifyContent='center' alignItems='center'
                        onClick={() => setShowMenu(true)}
                        // onMouseOut={()=>setShowMenu(false)}
                        ref={anchorEl}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </Stack>
                </Stack>
            </Box>
            <Menu
                className="NavBar-menu"
                open={showMenu}
                onClose={() => setShowMenu(false)}
                anchorEl={anchorEl.current}
                style={{ paddingTop: '0' }}
            >
                {MENU_ITEMS.map((item) => (
                    <MenuItem key={item} className="menuItem"><p>{item}</p></MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default NavBar;