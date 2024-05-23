import { Larp } from "../types";
import TagCard from "./TagDisplay";
import Twirldown from "./Twirldown";

import { Card, Typography, Stack, Box } from "@mui/material";
import DurationDisplay from "./DurationDisplay";
import LocationDisplay from "./LocationDisplay";

import "./EventDetails.scss";



type EventDetailsProps = {
    larp: Larp,
};

function EventDetails({ larp }: EventDetailsProps) {

    return (
        <Card className="EventDetails">
            <Stack
                className="EventDetails-contents"
                direction="column"
                spacing={2}
                alignContent="center"
            >
                <Box
                    className="image"
                    sx={{
                        backgroundImage: `url(${larp.imgUrl})`,
                        backgroundSize: 'cover',
                    }}
                >
                    <DurationDisplay
                        startDate={larp.startDate}
                        endDate={larp.endDate}
                    />
                </Box>
                <LocationDisplay
                    city={larp.city}
                    country={larp.country}
                    language={larp.language}
                />

                <Typography component="h3" variant='h2' className="title">
                    {larp.title}
                </Typography>
                <Twirldown title='details'>
                    <Typography>{larp.description}</Typography>
                </Twirldown>
                <Stack direction="row" spacing={1}>
                    {larp.tags.map((tag) => (
                        <TagCard key={tag.name} tag={tag} />
                    ))}
                </Stack>
            </Stack>
        </Card >
    );
}

export default EventDetails;