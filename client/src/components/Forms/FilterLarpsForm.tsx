import { Button, TextField, Typography } from "@mui/material";
import { LarpQuery } from "../../types";
import { useFormikContext, Form, Field } from "formik";
import FormikMuiTextField from "../FormComponents/FormikMuiTextField";


function FilterLarpsForm() {

  const { isValid } = useFormikContext<LarpQuery>();

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
          fullWidth
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