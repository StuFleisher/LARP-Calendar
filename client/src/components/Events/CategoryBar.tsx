import { Stack, Box, Typography } from "@mui/material";
import LarpCard from "./LarpCard";
import "./CategoryBar.scss";
import { useFetchLarps } from "../../hooks/useFetchLarps";
import LoadingSpinner from "../ui/LoadingSpinner";

type CategoryBarProps = {
    title: string;
    // filterObject: any;
};

function CategoryBar({ title }: CategoryBarProps) {

    const {larps, loading, error} = useFetchLarps();

    if (error.length) {
        console.warn("Error loading larps from", title);
    }
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
                {
                    loading
                        ?
                        <LoadingSpinner />
                        :
                        larps.map((larp) => (
                            <LarpCard larp={larp} key={larp.id} />
                        ))
                }
            </Stack>
        </Box>
    );
}

export default CategoryBar;