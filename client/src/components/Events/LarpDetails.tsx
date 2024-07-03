import { Larp } from "../../types";
import TagCard from "./TagDisplay";
import Twirldown from "../ui/Twirldown";

import { Card, Typography, Stack, Box } from "@mui/material";
import DurationDisplay from "./DurationDisplay";
import LocationDisplay from "./LocationDisplay";

import "./LarpDetails.scss";



type LarpDetailsProps = {
    larp: Larp,
};

function LarpDetails({ larp }: LarpDetailsProps) {

    // console.log(larp.start, "to", larp.end)
    return (
        <Card className="LarpDetails">
            <Stack
                className="LarpDetails-contents"
                direction="column"
                spacing={2}
                alignContent="center"
            >
                <Box
                    className="image"
                    sx={{
                        backgroundImage: `url(${larp.imgUrl})`,
                        backgroundSize: 'cover',
                    }}
                >
                    <DurationDisplay
                        start={larp.start}
                        end={larp.end}
                    />
                </Box>
                <LocationDisplay
                    city={larp.city}
                    country={larp.country}
                    language={larp.language}
                />

                <Typography component="h3" variant='h2' className="title">
                    {larp.title}
                </Typography>
                <Twirldown title='details'>
                    <Typography>{larp.description}</Typography>
                </Twirldown>
                <Stack direction="row" spacing={1}>
                    {larp.tags.map((tag) => (
                        <TagCard key={tag.name} tag={tag} />
                    ))}
                </Stack>
            </Stack>
        </Card >
    );
}

export default LarpDetails;