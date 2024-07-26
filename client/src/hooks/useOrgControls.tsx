import LarpAPI from "../util/api";
import { useNavigate } from "react-router-dom";

import DeleteLarpButtonComponent from "../components/FormComponents/DeleteButton";
import EditLarpButtonComponent from "../components/FormComponents/EditButton";

function useOrgControls(orgId: number) {

  const navigate = useNavigate();

  function deleteOrg(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    LarpAPI.DeleteOrg(orgId);
    navigate('/');
  }

  function editOrg(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/orgs/${orgId}/edit`);
  }

  const DeleteOrgButton = <DeleteLarpButtonComponent handleDelete={deleteOrg}/>
  const EditOrgButton = <EditLarpButtonComponent handleClick={editOrg}/>

  return { DeleteOrgButton, EditOrgButton };

}

export default useOrgControls;