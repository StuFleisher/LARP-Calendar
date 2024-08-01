import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Typography, Box, Slide } from "@mui/material";


type ErrorMessageProps = {
    errs: string[];
    title: string;
};

function ErrorMessage({ errs, title }: ErrorMessageProps) {
    return (
        <>

            {errs.map(err => (
                <Slide
                    direction="down"
                    in
                    key={err}
                >
                    <Alert
                        sx={{
                            position: "sticky",
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: '1000'
                        }}
                        severity="error"
                        icon={<FontAwesomeIcon icon={faX} />}
                    >
                        {title}:
                        <Typography key='err' variant="details2">
                            <br />{err}
                        </Typography>
                    </Alert>
                </Slide>
            ))}
        </>
    );
}

export default ErrorMessage;