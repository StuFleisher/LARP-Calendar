import { Stack } from "@mui/material";
import useLarpControls from "../hooks/useLarpControls";
import { Larp } from "../types";


type ActionsBarProps = {
    larp: Larp;
};

function ActionsBar({ larp }: ActionsBarProps) {
    // console.log(larp)

    const { DeleteLarpButton, EditLarpButton } = useLarpControls(larp.id);

    return (
        <Stack direction="row" >
            {EditLarpButton}
            {DeleteLarpButton}
        </Stack>
    );

}

export default ActionsBar