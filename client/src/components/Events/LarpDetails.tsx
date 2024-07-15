import { Larp } from "../../types";
import TagCard from "./TagDisplay";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faComment } from "@fortawesome/free-solid-svg-icons";

import { Typography, Stack, Box, Link } from "@mui/material";
import { JSDateToLuxon } from "../../util/typeConverters";

import "./LarpDetails.scss";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import useLarpControls from "../../hooks/useLarpControls";

import { Link as NavLink } from "react-router-dom";



type LarpDetailsProps = {
    larp: Larp,
};

function LarpDetails({ larp }: LarpDetailsProps) {
    const { username, isAdmin } = useContext(userContext);
    const { EditLarpButton, DeleteLarpButton } = useLarpControls(larp.id);

    return (
        <Box className="LarpDetails">
            <Box
                className="banner"
                sx={{
                    backgroundImage: `url(${larp.imgUrl})`,
                    backgroundSize: 'cover',
                }}
            >
                {
                    (larp.organizer === username) || isAdmin === true
                        ?
                        <Stack direction="row" className="organizerControls">
                            {EditLarpButton}
                            {DeleteLarpButton}
                        </Stack>
                        :
                        <></>

                }
            </Box>

            <Stack
                className="LarpDetails-content"
                direction="column"
                spacing={2}
                alignContent="center"
            >
                <Typography variant='h4' className="filled-secondary">
                    {
                        JSDateToLuxon(larp.start).toLocaleString({
                            weekday: 'short',
                            month: 'long',
                            day: 'numeric',
                        })
                    } - {
                        JSDateToLuxon(larp.start).toLocaleString({
                            weekday: 'short',
                            month: 'long',
                            day: 'numeric',
                        })
                    }
                </Typography>
                <Typography component="h1" variant='h1' className="title">
                    <Link component={NavLink} to={`/events/${larp.id}`}>
                        {larp.title}
                    </Link>
                </Typography>

                <Stack direction="row" spacing={1}>
                    {larp.tags.map((tag) => (
                        <TagCard key={tag.name} tag={tag} fontSize={14} />
                    ))}
                </Stack>

                <Box className="filled-light">
                    <Typography>
                        Hosted By: {larp.organizer}
                    </Typography>
                    <Typography
                        // color={ticketColor}
                        variant={'details2'}
                    >
                        Tickets: {larp.ticketStatus}
                    </Typography>
                </Box>

                <section id="About">
                    <Typography component="h3" variant='h2' className="Date & Time">
                        About this event:
                    </Typography>
                    <Typography>{larp.description}</Typography>
                </section>


                <section id="Location">
                    <Typography component="h3" variant='h2' className="Date & Time">
                        Location:
                    </Typography>
                    <Box>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            className="icon-text"
                        >
                            <FontAwesomeIcon icon={faLocationDot} />
                            <Typography >
                                {larp.city}, {larp.country}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            className="icon-text"
                        >
                            <FontAwesomeIcon icon={faComment} />
                            <Typography>
                                {larp.language}
                            </Typography>
                        </Stack>
                    </Box>
                </section>

                <section id="DateAndTime">
                    <Typography component="h3" variant='h2' className="Date & Time">
                        Date & Time:
                    </Typography>
                    <Typography>
                        <Box component='span' sx={{ fontWeight: 900 }}>Starts: </Box>
                        {JSDateToLuxon(larp.start).toLocaleString({
                            weekday: 'short',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </Typography>
                    <Typography>
                        <Box component='span' sx={{ fontWeight: 900 }}>Ends: </Box>
                        {JSDateToLuxon(larp.start).toLocaleString({
                            weekday: 'short',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </Typography>
                </section>

                <section id="Organizer">
                    <Typography component="h3" variant='h2' className="organizer">
                        About the organizer:
                    </Typography>
                    <section>

                        <Typography variant="h6" component="h6">{larp.organizer}</Typography>
                        <Typography component="a" href="#">
                            placeholderurl
                        </Typography>
                    </section>
                    <Typography>{larp.description}</Typography>
                </section>
            </Stack>
        </Box >
    );
}

export default LarpDetails;