import { DateTime } from "luxon";
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from "@mui/material";
import DateCard from "./DateCard";


type DurationDisplayProps = {
    startDate: DateTime,
    endDate: DateTime,
    background?: "light" | "dark";
};

function DurationDisplay({ startDate, endDate, background = "light" }: DurationDisplayProps) {

    const theme = useTheme();

    return (
        <Stack
            className="DurationDisplay"
            direction="row"
            alignItems="center"
            spacing={1}
        >
            <DateCard date={startDate} />
            <Typography variant="h3"
            sx={{
                color: background==="dark" ? 'white' : theme.palette.dark.main
            }}>
                -
            </Typography>
            <DateCard date={endDate} />
        </Stack>
    )
}

export default DurationDisplay;