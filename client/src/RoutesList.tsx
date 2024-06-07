import { Routes, Route } from "react-router-dom";

import HomePage from "./views/HomePage";

function RoutesList() {


    return (
        <>
            <Routes>
                <Route path='*' element={<HomePage />} />
            </Routes>
        </>
    );
}

export default RoutesList;