
import { Routes, Route } from "react-router-dom";
import LarpsDashboard from "./LarpsDashboard";

function AdminRoutes(){

    return (
        <Routes>
            <Route path="/" element={<LarpsDashboard/>}/>
        </Routes>
    )
}

export default AdminRoutes