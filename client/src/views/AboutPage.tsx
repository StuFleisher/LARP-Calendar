import { useEffect, useState } from "react";
import LarpAPI from "../util/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCalendar, faCheck, faCheckCircle, faCircleChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link as RouterLink } from "react-router-dom";

function AboutPage() {


  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        alignContent="center"
        m="2rem"
      >
        <Box className="filled-light"
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: '3rem'
          }}
        >

          <Typography component="h1" variant='h1' className="title">
            <Typography
              variant='h1'
              component='span'
              sx={{ display: 'inline' }}
              color='primary'
            >
              <FontAwesomeIcon icon={faCalendar} />  &nbsp;
            </Typography>
            We Are LarpCal!
          </Typography>
          <Typography variant="h4">
            The event hub for Live Action Role Playing events in Europe and beyond!
          </Typography>
        </Box>

        <Typography variant="h5">
          This site is still under construction.  Here are some of the features you can expect to see in Phase II:
        </Typography>
        <List dense>
          <ListItem>
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp; Fulltext search for events
          </ListItem>
          <ListItem>
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp;
            Event List page will be filterable by date, location, tags and more
          </ListItem>
          <ListItem>
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp;
            Category displays (featured, this month etc) will display only the relevant events
          </ListItem>
          <ListItem>
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp;
            Connection to donation site
          </ListItem>
          <ListItem>
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp;
            Full page build for 'About'
          </ListItem>
          <ListItem>
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp;
            Ongoing bugfixes
          </ListItem>
        </List>

        <Box className="filled-light"
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: '3rem'
          }}
        >

          <Typography component="h1" variant='h1' className="title">
            <Typography
              variant='h3'
              component='span'
              sx={{ display: 'inline' }}
              color='primary'
            >
            </Typography>
            Make a Donation
          </Typography>
          <Typography variant="h5">
            Your support keeps us running
          </Typography>
          <Button variant="contained" component={RouterLink} to="#"
            sx={{
              margin:"2rem"
            }}
          >
            Donate Today (this button is fake)
            </Button>
        </Box>


      </Stack>
    </>
  );

}

export default AboutPage;