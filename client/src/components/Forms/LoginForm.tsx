import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { UserLoginData } from "../../types";

import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// import './loginForm.scss';

const DEFAULT_FORM_DATA: UserLoginData = {
    username: "",
    password: "",
};

type props = {
    login: (credentials: UserLoginData) => Promise<void>,
    hideRegistrationLink?: boolean,
};

function LoginForm ({ login, hideRegistrationLink = false }: props) {

    const [formData, setFormData] = useState<UserLoginData>(DEFAULT_FORM_DATA);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;
        setFormData((currentFormData) => {
            return {
                ...currentFormData,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            await login(formData);
            navigate(`/users/${formData.username}`);
        } catch (err) {
            setError("Invalid username/password");
        }
    }

    return (
        <Stack spacing={2} component="form">
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <TextField
                    sx={{ flexGrow: 1 }}
                    variant="outlined"
                    name="username"
                    label="Username"
                    onChange={handleChange} />
                <TextField
                    sx={{ flexGrow: 1 }}
                    variant="outlined"
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange} />
            </Stack>
            {error ? <Typography variant="subtitle1" color="primary">{error}</Typography> : <></>}
            <Button
                variant="contained"
                type="submit"
                onClick={(e) => { handleSubmit(e); }}>
                Log In
            </Button>
            {!hideRegistrationLink &&
                <Link component={RouterLink} to="/register">
                    <Typography component="p" variant="caption" align="center">
                        Register a new account
                    </Typography>
                </Link>
            }
        </Stack>
    );
}

export default LoginForm;