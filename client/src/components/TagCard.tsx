import { Box, Typography } from "@mui/material";
import { Tag } from "../types";
import './TagCard.scss';

type TagCardProps = {
    tag: Tag,
};

export default function TagCard({ tag }: TagCardProps) {
    return (
        <Box className="tagCard">
            <Typography key={tag.name} variant="caption">
                {tag.name}
            </Typography>
        </Box>
    );
}