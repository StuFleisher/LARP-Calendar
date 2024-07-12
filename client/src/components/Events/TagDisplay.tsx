import { Stack, Typography, Box } from "@mui/material";
import { Tag } from "../../types";
import './TagDisplay.scss';

type TagDisplayProps = {
    tag: Tag;
    fontSize?: number;
};

function TagDisplay({ tag, fontSize = 10 }: TagDisplayProps) {
    return (
        <Stack
            direction="column"
            justifyContent="center"
        >
            <Box
                className="tagDisplay"
            >
                <Typography
                    // className="tagDisplay"
                    key={tag.name}
                    variant="details2"
                    sx={{
                        fontSize: fontSize,
                    }}
                >
                    {tag.name}
                </Typography>
            </Box>
        </Stack>
    );
}

export default TagDisplay;