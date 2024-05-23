import { Box, Stack, Typography, IconButton } from "@mui/material";
import { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import './Carousel.scss';

type CarouselProps = {
    title: string;
    children: ReactNode[];
};

function Carousel({ title, children }: CarouselProps) {
    const [displayed, setDisplayed] = useState(0);

    return (
        <Stack
            className='Carousel'
            direction="column"
            alignItems="center"
        >
            <Typography className="Carousel-title" variant='h2'>{title}</Typography>
            <Stack
                className="Carousel-contents"
                alignItems={'center'}
                direction="row"
            >
                <Box className='Carousel-previousButton'>
                <IconButton >
                    <FontAwesomeIcon icon={faCircleChevronLeft} color={'#070707'} />
                </IconButton>
                </Box>
                {children[displayed]}
                <Box className='Carousel-previousButton'>
                <IconButton >
                    <FontAwesomeIcon icon={faCircleChevronRight} color={'#070707'} />
                </IconButton>
                </Box>
            </Stack >
        </Stack>
    );

}

export default Carousel;