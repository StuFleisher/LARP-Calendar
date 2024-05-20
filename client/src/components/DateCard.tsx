import { DateTime } from "luxon";
import { Typography, Box, Card } from "@mui/material";
import "./DateCard.scss";

type DateCardProps = {
    date: DateTime;
};

export default function DateCard({ date }: DateCardProps) {

    return (
        <Card className="DateCard">
            <Box sx={{
                backgroundColor: "white"
            }}>

                <Typography className="month">
                    {date.toLocal().monthShort}

                </Typography>
                <Typography className="day">
                    {date.toLocal().day}
                </Typography>
            </Box>
        </Card>
    );
}