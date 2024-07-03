import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { FieldProps } from 'formik';

type SelectInputProps = FieldProps & {
    options: { label: string, value: string; }[];
    label: string;
};

function FormikSelectInput({ form, field, options, label }: SelectInputProps) {

    return (
        <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select
                labelId={`#${field.name}-label`}
                {...field}
                onChange={(event) => form.setFieldValue(field.name, event.target.value)}
                value={field.value}
            >
                {
                    options.map(option => (
                        <MenuItem value={option.value} key={option.label}>
                            {option.label}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}

export default FormikSelectInput;