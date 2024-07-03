import { useFormikContext, Form } from "formik";
import { Larp } from "../../types";

import { Box, Button, Stack, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

import FormikMuiTextField from "../FormComponents/FormikMuiTextField";
import FormikSelectInput from "../FormComponents/FormikSelectInput";
import FormikDateTimePicker from "../FormComponents/FormikDateTimePicker";
import ErrorDisplay from "../FormComponents/ErrorDisplay";
import { FastField, Field } from "formik";
import { DateTime } from "luxon";



function EventForm() {

    const { values, isValid, errors } = useFormikContext<Larp>();
    const errorMessage = (`
        Please check following fields to continue:
        ${Object.keys(errors).map(key => { return key !== "steps" ? key : null; }).join(", ")}
    `);

    return (
        <>
            <Box className="RecipeForm">
                <Form>
                    <FastField
                        component={FormikMuiTextField}
                        placeholder="Name your event"
                        // className="RecipeInfoInput-name MuiTypography-h2"
                        name="title"
                        id="larp-title"
                        label="Event title"
                        fullWidth
                    />
                    <Field
                        component={FormikSelectInput}
                        options = {[
                            { label: "Available", value: "AVAILABLE" },
                            { label: "Limited", value: "LIMITED" },
                            { label: "Sold Out", value: "SOLD_OUT" },
                        ]}
                        // className="RecipeInfoInput-name MuiTypography-h2"
                        placeholder={"AVAILABLE"}
                        name="ticketStatus"
                        id="larp-ticketStatus"
                        label="Ticket Status"
                    />
                    <FastField
                        component={FormikMuiTextField}
                        // className="RecipeInfoInput-description"
                        placeholder='Add a description for your event'
                        name="description"
                        id="larp-Description"
                        label="Event description"
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={10}
                    />
                    <FastField
                        component={FormikMuiTextField}
                        // className="RecipeInfoInput-description"
                        placeholder='What city will your event take place in'
                        name="city"
                        id="larp-city"
                        label="City"
                    />
                    <FastField
                        component={FormikMuiTextField}
                        // className="RecipeInfoInput-description"
                        placeholder='What country will your event take place in?'
                        name="country"
                        id="larp-country"
                        label="Country"
                    />
                    <FastField
                        component={FormikMuiTextField}
                        // className="RecipeInfoInput-description"
                        placeholder='What is the primary language for your event?'
                        name="language"
                        id="larp-language"
                        label="Language"
                    />
                    <Field
                        component={FormikDateTimePicker}
                        // className="RecipeInfoInput-description"
                        disablePast
                        placeholder={DateTime.now()}
                        name="start"
                        id="larp-start"
                        label="Start Date"
                    />
                    <Field
                        component={FormikDateTimePicker}
                        disablePast
                        // className="RecipeInfoInput-description"
                        placeholder={DateTime.now()}
                        name="end"
                        id="larp-end"
                        label="End Date"
                    />

                    {/* <Button
                        color="primary"
                        onClick={async (e) => {
                            e.preventDefault();
                            deleteRecipe();
                        }}
                    >
                        Delete Recipe
                    </Button> */}
                    <Box className="Recipe-submitButton">
                        <Stack direction="row" alignContent="center" spacing={2}>
                            {!isValid && <ErrorDisplay message={errorMessage} />}

                            <Button
                                type='submit'
                                variant="contained"
                                color="primary"
                                disabled={isValid ? false : true}
                            >
                                <Typography variant="h5">
                                    Save Changes
                                </Typography>
                            </Button>
                        </Stack>

                    </Box>
                </Form>
            </Box>
        </>
    );
}


export default EventForm;