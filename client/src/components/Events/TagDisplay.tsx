import { Box, Typography } from "@mui/material";
import { Tag } from "../../types";
import './TagDisplay.scss';

type TagDisplayProps = {
    tag: Tag,
};

function TagDisplay({ tag }: TagDisplayProps) {
    return (
        <Box className="tagDisplay">
            <Typography key={tag.name} variant="caption">
                {tag.name}
            </Typography>
        </Box>
    );
}

export default TagDisplay