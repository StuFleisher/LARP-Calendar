import { Grid, Box, Typography } from "@mui/material";
import LarpCard from "../components/Events/LarpCard";
import { useFetchLarps } from "../hooks/useFetchLarps";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useLocation, Link } from "react-router-dom";

const RECORDS_PER_PAGE = 12;

function LarpListPage() {
    const [larps, loading, error] = useFetchLarps();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const q = query.get('q');

    const page = parseInt(query.get('page') || '1', 10);
    const pageStart = (page - 1) * RECORDS_PER_PAGE;
    const pageEnd = (page) * RECORDS_PER_PAGE;
    const pageCount = Math.ceil(larps.length / RECORDS_PER_PAGE);

    const pagination = (<Pagination
        count={pageCount}
        page={page}
        sx={{
            '& > .MuiPagination-ul': {
                justifyContent: 'center',
            },
            margin:'1rem',

        }}
        renderItem={(item) => (
            <PaginationItem
                className="EventList-pagelink"
                component={Link}
                to={`${location.pathname}${`?page=${item.page}`}${q ? `&q=${q}` : ""}`}
                {...item}
            />
        )}
    />);

    if (larps.length === 0) {
        return (
            <Box className="EventList-empty">
                <Typography variant="body1" color="charcoal" align="center">
                    There are no recipes to display.
                </Typography>
            </Box>
        );
    }

    return (
        <>
            {loading && <h1>fetching larp data</h1>}
            {error && <h1>There was an error</h1>}

            {pagination}
            <Grid
                container
                flexWrap={"wrap"}
                spacing={2}
                margin="auto"
                justifyContent="center"
                sx={{padding:'1rem'}}
            >
                {
                    larps.slice(pageStart, pageEnd).map((larp) => {
                        return (
                            <Grid item key={larp.id}>
                                <LarpCard larp={larp} />
                            </Grid>
                        );
                    })}

            </Grid >
            {pagination}
        </>

    );
}

export default LarpListPage;