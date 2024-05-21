import { DateTime } from "luxon";
import { Typography, Box } from "@mui/material";
import "./DateCard.scss";

type DateCardProps = {
    date: DateTime;
};

export default function DateCard({ date }: DateCardProps) {

    return (
        <Box className="DateCard">
                <Typography className="month">
                    {date.toLocal().monthShort}
                </Typography>
                <Typography className="day">
                    {date.toLocal().day}
                </Typography>
        </Box>
    );
}