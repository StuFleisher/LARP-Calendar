import './EventCard.scss';
import { Larp } from '../types';

import { useTheme } from '@mui/material/styles'; import { Card, Box, Stack, Typography } from "@mui/material";

import LocationDisplay from './LocationDisplay';
import DurationDisplay from './DurationDisplay';
import TagCard from './TagDisplay';
import TagDisplay from './TagDisplay';

type EventCardProps = {
    larp: Larp,
};

export default function EventCard({ larp }: EventCardProps) {

    const theme = useTheme();

    console.log(theme.palette);
    let ticketColor = theme.palette.success.main;
    if (larp.ticketStatus === "Limited") ticketColor = theme.palette.warning.main;
    if (larp.ticketStatus === "Sold Out") ticketColor = theme.palette.error.main;

    return (
        <Card className='EventCard'>
            <Box className="EventCard-header">
                <Stack
                    direction="row"
                    alignItems='center'
                    spacing={1}
                >
                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="9.5" r="9"
                            stroke={ticketColor}
                        />
                    </svg>
                    <Typography variant="h2" className="title">
                        {larp.title}
                    </Typography>
                </Stack>
            </Box>
            <Stack
                className="EventCard-contentContainer"
                direction="row"
                justifyContent='space-between'

            >
                <Stack
                    className="EventCard-content"
                    direction="column"
                    spacing={0}
                >
                    <Typography color={ticketColor} variant='caption'>
                        Tickets {larp.ticketStatus}
                    </Typography>
                    <Typography variant='caption'>
                        {larp.eventUrl}
                    </Typography>
                    <Typography variant='caption'>
                        Organized by: {larp.organizer}
                    </Typography>
                </Stack>
                <DurationDisplay
                    startDate={larp.startDate}
                    endDate={larp.endDate}
                />

            </Stack>
            <Stack direction="row" spacing={1}>
                {larp.tags.map((tag) => (
                    <TagCard key={tag.name} tag={tag} />
                ))}
            </Stack>
            <LocationDisplay
                city={larp.city}
                country={larp.country}
                language={larp.language}
            />
        </Card>
    );
}