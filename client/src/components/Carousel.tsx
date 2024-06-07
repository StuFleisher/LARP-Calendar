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
    const [displayIdx, setDisplayIdx] = useState(0);

    function showNext(e: React.MouseEvent) {
        e.preventDefault();
        setDisplayIdx((displayed) => (children.length + displayed + 1) % children.length);
    }
    function showPrev(e: React.MouseEvent) {
        e.preventDefault();
        setDisplayIdx((displayed) => (children.length + displayed - 1) % children.length);
    }



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
                <Box className='previousButton'>
                    <IconButton
                        component="button"
                        onClick={showPrev}
                    >
                        <FontAwesomeIcon icon={faCircleChevronLeft} color={'#070707'} />
                    </IconButton>
                </Box>

                <Box
                    className={`currentCard`}
                >
                    {children[displayIdx]}
                </Box>

                <Box className='nextButton'>
                    <IconButton
                        component="button"
                        onClick={showNext}
                    >
                        <FontAwesomeIcon icon={faCircleChevronRight} color={'#070707'} />
                    </IconButton>
                </Box>
            </Stack >
        </Stack>
    );

}

export default Carousel;