import { Stack, Box, Typography } from "@mui/material";
import { Larp } from "../../types";
import LarpCard from "./LarpCard";
import "./CategoryBar.scss";

type CategoryBarProps = {
    title: string;
    larps: Larp[];
};

function CategoryBar({ title, larps }: CategoryBarProps) {

    return (
        <Box
            className="CategoryBar"
        >
            <Typography variant="h2">
                {title}
            </Typography>

            <Stack
                className="CategoryBar-itemContainer"
                direction="row"
                spacing={1}
            >
                {larps.map((larp) => (
                    <LarpCard larp={larp} key={larp.id} />
                ))}

            </Stack>
        </Box>
    );
}

export default CategoryBar;