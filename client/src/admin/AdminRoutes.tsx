
import { Routes, Route, Navigate } from "react-router-dom";
import LarpsDashboard from "./LarpsDashboard";
import AdminHome from "./AdminHome";
import AdminEditLarp from "./AdminEditLarp";
import LarpDetailPage from "../views/LarpDetailPage";
import OrgsDashboard from "./OrgsDashboard";
import UsersDashboard from "./UsersDashboard";

function AdminRoutes(){

    return (
        <Routes>
            <Route path="/" element={(
                <AdminHome></AdminHome>
            )}
            >
                <Route path="/" element={<Navigate to="events"/>}/>
                <Route path="/events" element={<LarpsDashboard/>}/>
                <Route path="/events/:id" element={<AdminEditLarp/>}/>
                <Route path="/users" element={<UsersDashboard/>}/>
                <Route path="/applications" element={<LarpsDashboard/>}/>
                <Route path="/organizers" element={<OrgsDashboard/>}/>
            </Route>
        </Routes>
    )
}

export default AdminRoutes