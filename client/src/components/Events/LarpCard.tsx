import './LarpCard.scss';
import { Larp } from '../../types';

import { useTheme } from '@mui/material/styles';
import { Card, Box, Stack, Typography } from "@mui/material";

import LocationDisplay from './LocationDisplay';
import DurationDisplay from './DurationDisplay';
import TagCard from './TagDisplay';
import Twirldown from '../ui/Twirldown';

type LarpCardProps = {
    larp: Larp,
};

export default function LarpCard({ larp }: LarpCardProps) {
    const theme = useTheme();

    let ticketColor = theme.palette.success.main;
    if (larp.ticketStatus === "LIMITED") ticketColor = theme.palette.warning.main;
    if (larp.ticketStatus === "SOLD_OUT") ticketColor = theme.palette.error.main;

    return (
        <Card className='LarpCard'>
            <Box className="LarpCard-header">
                <Stack
                    direction="row"
                    alignItems='center'
                    spacing={1}
                >
                    <svg width="30" height="30" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="9.5" r="9"
                            stroke={ticketColor}
                        />
                    </svg>
                    <Typography variant='h2' component="h3" className="title">
                        {larp.title}
                    </Typography>
                </Stack>
            </Box>
            <Stack
                className="LarpCard-contentContainer"
                direction="row"
                justifyContent='space-between'
                alignItems="flex-start"

            >
                <Stack
                    className="LarpCard-content"
                    direction="column"
                    spacing={0}
                >
                    <Typography color={ticketColor}>
                        Tickets {larp.ticketStatus}
                    </Typography>
                    <Typography >
                        {larp.eventUrl}
                    </Typography>
                    <Typography>
                        Organized by: {larp.organizer}
                    </Typography>
                    <Twirldown title='details'>
                        <Typography>{larp.description}</Typography>
                        <Stack
                        direction="row"
                        spacing={1}
                        sx={{marginTop:'.5rem'}}
                        >
                            {larp.tags.map((tag) => (
                                <TagCard key={tag.name} tag={tag} />
                            ))}
                        </Stack>
                    </Twirldown>
                </Stack>
                <DurationDisplay
                    start={larp.start}
                    end={larp.end}
                />

            </Stack>
            <LocationDisplay
                city={larp.city}
                country={larp.country}
                language={larp.language}
            />
        </Card>
    );
}