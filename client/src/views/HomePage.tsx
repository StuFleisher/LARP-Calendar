import Calendar from "../components/Calendar/Calendar";
import CategoryBar from "../components/Events/CategoryBar";
import { useFetchLarps } from "../hooks/useFetchLarps";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { DateTime } from "luxon";
// import Carousel from "../components/ui/Carousel";
// import { Typography, Box, Stack } from "@mui/material";

function HomePage() {

    const { larps, loading, error } = useFetchLarps(null);

    return (
        <>
            {
                loading
                    ?
                    <LoadingSpinner />
                    :

                    <>
                        <ErrorMessage
                            title="Sorry, there was a problem fetching records for this page"
                            errs={error}
                        />
                        {/* <Stack
                            direction={{md:"row"}}
                            justifyContent="center"
                            alignItems={"center"}
                            spacing={3}
                            sx={{
                                margin: {
                                    xs:"1rem 10% 1rem 10%",
                                    sm:"3rem 10% 3rem 10%",
                                    md:"5rem 10% 5rem 10%",
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src="/BannerIcon.svg"
                                sx={{
                                    aspectRatio: '1/1',
                                    width: {
                                        xs:'50%',
                                        sm: '40%',
                                        md:'35%',
                                    },
                                    // opacity:"80%"
                                }}
                            />
                            <Stack
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography
                                    variant="h2"
                                    // color="white"
                                    sx={{
                                        fontSize: {
                                            xs: "2.5rem",
                                            sm: "3rem",
                                            md: "3.5rem",
                                        },
                                        color: (theme) => theme.palette.primary.light,
                                        // lineBreak:"loose",
                                        textAlign: {xs:"center", md:"left"},
                                    }}
                                >
                                    Your Hub for <Box component="span" sx={{ color: (theme) => theme.palette.primary.main }}>Live Action Role Playing </Box> Events
                                </Typography>
                            </Stack>
                        </Stack>

                        <Carousel
                            filterSet={{
                                startAfter: DateTime.now().toISO(),
                                isFeatured: true,
                            }}
                        /> */}

                        <CategoryBar
                            title="Featured Events"
                            filterSet={{
                                // startAfter: DateTime.now().toISO(),
                                isFeatured:true,
                            }}
                        />

                        <Calendar larps={larps} />

                        <CategoryBar
                            title="Recently Added"
                            filterSet={{
                                createdAfter: DateTime.now().minus({ weeks: 1 }).toISO(),
                                // startAfter: DateTime.now().toISO(),
                            }}

                        />
                        <CategoryBar
                            title="Events this Month"
                            filterSet={{
                                // startAfter: DateTime.now().toISO(),
                                startBefore: DateTime.now().endOf("month").toISO()
                            }}

                        />
                        <CategoryBar
                            title="Events next Month"
                            filterSet={{
                                startAfter: DateTime.now().plus({ month: 1 }).startOf("month").toISO(),
                                startBefore: DateTime.now().plus({ month: 1 }).endOf("month").toISO()
                            }}
                        />
                        <CategoryBar
                            title="Family friendly events"
                            filterSet={{
                                startAfter: DateTime.now().toISO(),
                                tags: "family friendly"
                            }}
                        />
                    </>
            }
        </>
    );
}

export default HomePage;