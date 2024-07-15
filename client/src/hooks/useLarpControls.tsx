import LarpAPI from "../util/api";
import { useNavigate } from "react-router-dom";

import DeleteLarpButtonComponent from "../components/FormComponents/DeleteLarpButton";
import EditLarpButtonComponent from "../components/FormComponents/EditLarpButton";

function useLarpControls(larpId: number) {

  const navigate = useNavigate();

  function deleteLarp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    LarpAPI.DeleteLarp(larpId);
    navigate('/events');
  }

  function editLarp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/events/${larpId}/edit`);
  }

  const DeleteLarpButton = <DeleteLarpButtonComponent handleDelete={deleteLarp}/>
  const EditLarpButton = <EditLarpButtonComponent handleClick={editLarp}/>

  return { DeleteLarpButton, EditLarpButton };

}

export default useLarpControls;