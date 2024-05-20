import { Larp } from "../types";
import DateCard from "./DateCard";

import { Card, Typography, Stack, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faComment } from "@fortawesome/free-solid-svg-icons";

import "./EventCard.scss";


type EventCardProps = {
    larp: Larp,
};

function EventCard({ larp }: EventCardProps) {

    return (
        <Card className="EventCard">
            <Stack
                className="EventCard-contents"
                direction="column"
                alignContent="center"
            >
                <Typography variant="h2" className="title">
                    {larp.title}
                </Typography>
                <Box
                    className="image"
                    sx={{
                        backgroundImage: `url(${larp.imgUrl})`
                    }}
                >
                    <Stack
                        className="DateContainer"
                        direction="row"
                        spacing={2}
                    >

                        <DateCard date={larp.startDate} />
                        <DateCard date={larp.endDate} />
                    </Stack>
                </Box>
                <Stack direction="row" spacing={2} className="regionContainer">
                    <Stack direction="row" spacing={1}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Typography>
                            {larp.city}, {larp.country}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <FontAwesomeIcon icon={faComment} />
                        <Typography>
                            {larp.language}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={1}>
                    {larp.tags.map((tag) => (
                        <Typography key={tag.name}>{tag.name}</Typography>
                    ))}
                </Stack>
            </Stack>
        </Card >
    );
}

export default EventCard;