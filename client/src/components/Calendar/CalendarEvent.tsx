// import { Tooltip } from "react-tooltip";
import { Box, Popper } from "@mui/material";
import { Larp } from "../../types";
import EventCard from "../Events/LarpCard";
import { EventProps } from "react-big-calendar";
import { useState, useRef } from "react";


function CalendarEvent(props: EventProps<Larp>) {
    const { event } = props;
    const [showTooltip, setShowTooltip] = useState(false);
    const anchorEl = useRef(null);
    //USE react-popper for a non mui solution

    return (
        <Box
            onMouseOver={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            ref={anchorEl}
            style={{
                height: '100%',
                width: '100%',
            }}
        >
            {event.title}

            <Popper
            placement="left"
                open={showTooltip}
                anchorEl={anchorEl.current}
                style={{zIndex:1000, padding:'0 .5rem'}}
            >
                <EventCard larp={event} />
            </Popper>
        </Box>
    );
}

export default CalendarEvent;