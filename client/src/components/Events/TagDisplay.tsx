import { Box, Typography } from "@mui/material";
import { Tag } from "../../types";
import './TagDisplay.scss';

type TagDisplayProps = {
    tag: Tag,
};

function TagDisplay({ tag }: TagDisplayProps) {
    return (
            <Typography key={tag.name} variant="details2" className="tagDisplay">
                {tag.name}
            </Typography>
    );
}

export default TagDisplay