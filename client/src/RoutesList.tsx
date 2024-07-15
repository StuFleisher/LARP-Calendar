import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./context/userContext";

import HomePage from "./views/HomePage";
import NewLarpPage from "./views/CreateLarpPage";
import EditLarpPage from "./views/EditLarpPage";
import LoginForm from "./components/Forms/LoginForm";
import { UserForCreate, UserLoginData } from "./types";
import LarpDetailPage from "./views/LarpDetailPage";
import LarpListPage from "./views/LarpListPage";
import AdminRoutes from "./admin/AdminRoutes";


type RoutesListProps = {
    login: (credentials: UserLoginData) => Promise<void>,
    register: (userInfo: UserForCreate) => Promise<void>;
    logout: () => void;
};

function RoutesList({ login, register, logout }: RoutesListProps) {
    const { username, isAdmin, isOrganizer } = useContext(userContext);


    const anonRoutes = (
        <>
            <Route path='/auth/login' element={<LoginForm login={login} />} />
        </>
    );

    const loginRoutes = (
        <>
        </>
    );

    const organizerRoutes = (
        <>
            <Route path='/events/:id/edit' element={<EditLarpPage />} />
            <Route path='/events/create' element={<NewLarpPage />} />
        </>
    );

    const adminRoutes = (
        <>
            <Route path='/admin/*' element={<AdminRoutes />} />

        </>
    );


    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                {username ? loginRoutes : anonRoutes}
                {isOrganizer ? organizerRoutes : ""}
                {isAdmin ? adminRoutes : ""}
                {/* <Route path='/events/create' element={<NewEventPage />} /> */}
                <Route path='/events' element={<LarpListPage />} />
                <Route path='/events/:id' element={<LarpDetailPage />} />
                <Route path='*' element={<HomePage />} />
            </Routes>
        </>
    );
}

export default RoutesList;