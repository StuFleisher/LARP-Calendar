import { Larp } from "../types";
import DateCard from "./DateCard";
import TagCard from "./TagCard";

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
                spacing={2}
                alignContent="center"
            >
                <Box
                    className="image"
                    sx={{
                        backgroundImage: `url(${larp.imgUrl})`
                    }}
                >
                    <Stack
                        className="DateContainer"
                        direction="row"
                        spacing={1}
                    >

                        <DateCard date={larp.startDate} />
                        <Typography variant="h3" sx={{color:'white'}}>-</Typography>
                        <DateCard date={larp.endDate} />
                    </Stack>
                </Box>
                <Stack direction="row" spacing={2} className="regionContainer">
                    <Stack direction="row" spacing={1}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Typography variant="caption">
                            {larp.city}, {larp.country}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <FontAwesomeIcon icon={faComment} />
                        <Typography variant="caption">
                            {larp.language}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography variant="h2" className="title">
                    {larp.title}
                </Typography>
                <Stack direction="row" spacing={1}>
                    {larp.tags.map((tag) => (
                        <TagCard key={tag.name} tag={tag}/>
                    ))}
                </Stack>
            </Stack>
        </Card >
    );
}

export default EventCard;