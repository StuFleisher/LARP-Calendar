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

    const user = useContext(userContext);
    
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


    /** Dropdown menu contents */
    const ACCOUNT_MENU = (
        <Menu
            open={showAccountMenu}
            anchorEl={anchorEl}
            onClose={() => {
                setShowAccountMenu(false);
                handleCloseMenu();
            }}

        >
            {
                user.username
                    ? (
                        <Box>
                            <MenuItem
                                component={RouterLink}
                                to="/auth/logout"
                                onClick={() => setShowAccountMenu(false)}
                            >
                                Log Out
                            </MenuItem>
                            <MenuItem
                                component={RouterLink}
                                to={
                                    user.organization
                                        ?
                                        `/orgs/${user.organization.id}`
                                        :
                                        `/orgs/apply`
                                }
                                onClick={() => setShowAccountMenu(false)}
                            >
                                Organizer Hub
                            </MenuItem>
                        </Box>
                    )
                    : (
                        <Box>
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
                        </Box>
                    )
            }
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

            {
                user.username
                    ? (
                        <Box>
                            <MenuItem
                                component={RouterLink}
                                to="/auth/logout"
                                onClick={() => setShowAccountMenu(false)}
                            >
                                Log Out
                            </MenuItem>
                            <Divider />
                            <MenuItem
                                component={RouterLink}
                                to={
                                    user.organization
                                        ?
                                        `/orgs/${user.organization.id}`
                                        :
                                        `/orgs/apply`
                                }
                                onClick={() => setShowAccountMenu(false)}
                            >
                                Organizer Hub
                            </MenuItem>
                        </Box>
                    )
                    : (
                        <Box>
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
                            <Divider />
                        </Box>
                    )
            }
            <MenuItem
                component={RouterLink}
                to="/auth/logout"
                onClick={() => setShowAccountMenu(false)}
            >
                About
            </MenuItem>

            <MenuItem
                component={RouterLink}
                to="/auth/logout"
                onClick={() => setShowAccountMenu(false)}
            >
                Events
            </MenuItem>
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
                                //FIXME:
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