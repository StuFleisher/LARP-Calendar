import { useState, useEffect, useCallback, useContext } from "react";
import { userContext } from "../context/userContext";
import { Box, Stack, Button, MenuItem, Typography, Menu, Hidden, Tooltip, useMediaQuery, useTheme, Divider, Card } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendar, faShapes, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import './NavBar.scss';
import { NavLink as RouterLink } from "react-router-dom";
import { UserLoginData } from "../types";
import SearchBar from "./ui/SearchBar";


type NavBarProps = {
    login: (credentials: UserLoginData) => Promise<void>;
};

function NavBar({ login }: NavBarProps) {

    const { username, organization, isAdmin } = useContext(userContext);

    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    function handleClickMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleCloseMenu() {
        setAnchorEl(null);
    }


    //Close dropdown menus when the anchor element unmounts
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const handleResize = useCallback(() => {
        if (isSmallScreen && showAccountMenu) {
            setShowAccountMenu(false);
        }
        if (!isSmallScreen && showMobileMenu) {
            setShowMobileMenu(false);
        }
    }, [isSmallScreen, showAccountMenu, showMobileMenu]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    /*********************** Menu Item Display Elements by Auth ******************************/
    const ANON_ITEMS = (
        <Box>
            {!username &&
                <>
                    <MenuItem
                        component={RouterLink}
                        to="/auth/register"
                        onClick={() => setShowAccountMenu(false)}
                    >
                        Sign Up
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to="/auth/login"
                        onClick={() => setShowAccountMenu(false)}
                    >
                        Log In
                    </MenuItem>

                </>
            }
        </Box>
    );

    const USER_ITEMS = (
        <Box>
            {username &&
                <>
                    <MenuItem
                        component={RouterLink}
                        to="/auth/logout"
                        onClick={() => setShowAccountMenu(false)}
                    >
                        Log Out
                    </MenuItem>
                    {!organization &&
                        <>
                            <Divider />
                            <MenuItem
                                component={RouterLink}
                                to={`/orgs/apply`}
                                onClick={() => setShowAccountMenu(false)}
                            >
                                Become an Organizer
                            </MenuItem>
                        </>
                    }
                </>
            }
        </Box>
    );

    const UNAPPROVED_ORG_ITEMS = (
        <Box>
            {username && organization && !organization.isApproved &&
                <>
                    <MenuItem
                        component={RouterLink}
                        to={`/orgs/${organization.id}`}
                        onClick={() => setShowAccountMenu(false)}
                    >
                        Organizer Hub
                    </MenuItem>
                </>
            }
        </Box>
    );

    const APPROVED_ORG_ITEMS = (
        <Box>
            {organization && organization.isApproved &&
                <>
                    <Divider />
                    <MenuItem
                        component={RouterLink}
                        to={`/events/create`}
                        onClick={() => setShowAccountMenu(false)}
                    >
                        Create an Event
                    </MenuItem>
                    <MenuItem
                        component={RouterLink}
                        to={`/orgs/${organization.id}`}
                        onClick={() => setShowAccountMenu(false)}
                    >
                        Organizer Hub
                    </MenuItem>
                </>
            }
        </Box >
    );

    const ADMIN_ITEMS = (
        <Box>
            {isAdmin &&
                <>
                    <Divider />
                    <MenuItem
                        component={RouterLink}
                        to={`/admin`}
                        onClick={() => setShowAccountMenu(false)}
                    >
                        Admin
                    </MenuItem>
                </>
            }
        </Box>
    );

    /*********************** Menu Displays ******************************/
    const ACCOUNT_MENU = (
        <Menu
            open={showAccountMenu}
            anchorEl={anchorEl}
            onClose={() => {
                setShowAccountMenu(false);
                handleCloseMenu();
            }}
        >
            {ANON_ITEMS}
            {USER_ITEMS}
            {UNAPPROVED_ORG_ITEMS}
            {APPROVED_ORG_ITEMS}
            {ADMIN_ITEMS}
        </Menu >
    );

    const MOBILE_MENU = (
        <Menu
            elevation={1}
            open={showMobileMenu}
            anchorEl={anchorEl}
            onClose={() => {
                setShowMobileMenu(false);
                handleCloseMenu();
            }}
        >

            {ANON_ITEMS}
            {USER_ITEMS}
            <Divider/>
            <MenuItem
                component={RouterLink}
                to="/about"
                onClick={() => setShowAccountMenu(false)}
            >
                About
            </MenuItem>

            <MenuItem
                component={RouterLink}
                to="/events"
                onClick={() => setShowAccountMenu(false)}
            >
                Events
            </MenuItem>
            {UNAPPROVED_ORG_ITEMS}
            {APPROVED_ORG_ITEMS}
            {ADMIN_ITEMS}
        </Menu >
    );

    /** Main component rendering */

    return (
        <>
            <Box className="NavBar">
                <Stack direction="row" justifyContent='space-between' alignItems={"end"}
                    className="NavBar"
                >
                    <Typography variant="h2" component={RouterLink} to='/' id="homeIcon"> LARP Calendar</Typography>

                    <Hidden mdDown>
                        <Box className="SearchBar"
                            sx={{
                                flexBasis: {
                                    sm: "1fr",
                                    md: "350px"
                                }
                            }}
                        >
                            <SearchBar></SearchBar>
                        </Box>
                    </Hidden>

                    <Stack
                        direction="row"
                        justifyContent='flex-end'
                        alignItems={"end"}
                        className="NavBar-linkContainer"
                        flexBasis="300px"
                    >
                        <Hidden smDown>
                            <Button component={RouterLink} to="/about" className="NavBar-button">
                                <FontAwesomeIcon icon={faShapes} />
                                ABOUT
                            </Button>
                            <Button component={RouterLink} to="/events" className="NavBar-button">
                                <FontAwesomeIcon icon={faCalendar} />
                                EVENTS
                            </Button>
                            <Button
                                className="NavBar-button"
                                onClick={(e) => {
                                    handleClickMenu(e);
                                    setShowAccountMenu(!showAccountMenu);
                                }
                                }
                            >
                                <FontAwesomeIcon icon={faUserAlt} />
                                ACCOUNT
                            </Button>
                        </Hidden>
                        <Hidden smUp>
                            <Button
                                className="NavBar-button"
                                onClick={(e) => {
                                    handleClickMenu(e);
                                    setShowMobileMenu(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </Button>
                        </Hidden>
                    </Stack>
                </Stack>

                <Hidden mdUp>
                    <Box className="SearchBar">
                        <SearchBar></SearchBar>
                    </Box>
                </Hidden>
                {
                    showAccountMenu &&
                    ACCOUNT_MENU
                }
                {
                    showMobileMenu &&
                    MOBILE_MENU
                }

            </Box>

        </>
    );
}

export default NavBar;