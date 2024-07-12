import LarpAPI from "../util/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { IconButton, Tooltip, Dialog, Typography, Button, Stack, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

function useLarpControls(larpId: number) {

  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  function deleteLarp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    LarpAPI.DeleteLarp(larpId);
    navigate('/events');
  }

  function editLarp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/events/${larpId}/edit`);
  }

  function DeleteLarpButton() {
    return (
      <>
        <Dialog
          open={showConfirm}
        >
          <Stack
            sx={{ padding: "1rem" }}
            spacing={2}
          >

            <Typography>Are you sure you want to delete this event?</Typography>
            <Stack direction="row" spacing={1} alignSelf="center">
              <Button variant="contained" onClick={(e) => { deleteLarp(e); }}>Delete</Button>
              <Button variant="contained" onClick={() => { setShowConfirm(false); }}>Cancel</Button>
            </Stack>
          </Stack>

        </Dialog>
        <Tooltip title="Delete this event">
          <IconButton
            onClick={(e) => { e.preventDefault(); setShowConfirm(true); }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Tooltip>
      </>
    );
  }


  function EditLarpButton() {
    return (
      <Tooltip title="Edit this event">
        <IconButton
          onClick={(e) => { editLarp(e); }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </IconButton>
      </Tooltip>
    );
  }


  return { DeleteLarpButton, EditLarpButton };

}

export default useLarpControls;