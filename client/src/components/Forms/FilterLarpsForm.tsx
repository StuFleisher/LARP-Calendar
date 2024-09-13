import { Button, Typography } from "@mui/material";
import { LarpQuery } from "../../types";
import { useFormikContext, Form, Field } from "formik";
import FormikMuiTextField from "../FormComponents/FormikMuiTextField";
import FormikSelectInput from "../FormComponents/FormikSelectInput";
import FormikDateTimePicker from "../FormComponents/FormikDateTimePicker";
import { DateTime } from "luxon";


function FilterLarpsForm() {

  const { isValid, values } = useFormikContext<LarpQuery>();

  return (
    <Form>
      <fieldset>
        <Field
          component={FormikMuiTextField}
          placeholder=''
          name="term"
          id="filter-term"
          label="Search Term"
          fullWidth
        />
        <Field
          component={FormikMuiTextField}
          placeholder=''
          name="title"
          id="filter-title"
          label="Title"
        />
        <Field
          component={FormikMuiTextField}
          placeholder=''
          name="tags"
          id="filter-tags"
          label="Tags"
        />
        <Field
          component={FormikSelectInput}
          options={[
            { label: "Available", value: "AVAILABLE" },
            { label: "Limited", value: "LIMITED" },
            { label: "Sold Out", value: "SOLD_OUT" },
          ]}
          placeholder='AVAILABLE'
          name="ticketStatus"
          id="filter-ticketStatus"
          label="Ticket Availability"
        />
      </fieldset>

      <fieldset>
        <Field
          component={FormikDateTimePicker}
          placeholder={DateTime.now()}
          name="startAfter"
          id="larp-startAfter"
          label="Starts After"
          value={DateTime.fromISO(values.startAfter || '')}
        />
        <Field
          component={FormikDateTimePicker}
          placeholder={DateTime.now()}
          name="startBefore"
          id="larp-startBefore"
          label="Starts Before"
          value={DateTime.fromISO(values.startBefore|| '')}
        />
        <Field
          component={FormikDateTimePicker}
          placeholder={DateTime.now()}
          name="endAfter"
          id="larp-endAfter"
          label="Ends After"
          value={DateTime.fromISO(values.endAfter || '')}
        />
        <Field
          component={FormikDateTimePicker}
          placeholder={DateTime.now()}
          name="endBefore"
          id="larp-endBefore"
          label="Ends Before"
          value={DateTime.fromISO(values.endBefore || '')}
        />

      </fieldset>

      <fieldset>
        <Field
          component={FormikMuiTextField}
          placeholder=''
          name="city"
          id="filter-city"
          label="City"
        />

        <Field
          component={FormikMuiTextField}
          placeholder=''
          name="country"
          id="filter-country"
          label="Country"
        />

        <Field
          component={FormikMuiTextField}
          placeholder=''
          name="language"
          id="filter-language"
          label="Language"
        />

        <Field
          component={FormikMuiTextField}
          placeholder=''
          name="organizer"
          id="filter-organizer"
          label="Organizer"
        />

      </fieldset>

      <Button
        type='submit'
        variant="contained"
        color="primary"
        disabled={isValid ? false : true}
      >
        <Typography variant="h3">
          Search
        </Typography>
      </Button>
    </Form>
  );
}

export default FilterLarpsForm;