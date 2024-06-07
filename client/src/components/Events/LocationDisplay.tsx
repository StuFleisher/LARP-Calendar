import { Typography, Stack,  } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faComment } from "@fortawesome/free-solid-svg-icons";

type LocationDisplayProps = {
    city:string,
    country:string,
    language:string,
}


function LocationDisplay(
    {city,country,language}:LocationDisplayProps
){

    return (
        <Stack direction="row" spacing={2} className="regionContainer">
                    <Stack direction="row" spacing={1}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <Typography variant="caption">
                            {city}, {country}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <FontAwesomeIcon icon={faComment} />
                        <Typography variant="caption">
                            {language}
                        </Typography>
                    </Stack>
                </Stack>
    )
}

export default LocationDisplay