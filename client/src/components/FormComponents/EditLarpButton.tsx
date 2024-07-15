import { Tooltip, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

type EditLarpButtonProps = {
    handleClick:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function EditLarpButton({handleClick}:EditLarpButtonProps) {
    return (
      <Tooltip title="Edit this event">
        <IconButton
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faPencil} />
        </IconButton>
      </Tooltip>
    );
  }

  export default EditLarpButton