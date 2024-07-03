import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./context/userContext";

import HomePage from "./views/HomePage";
import NewEventPage from "./views/CreateLarpPage";
import LoginForm from "./components/Forms/LoginForm";
import { UserForCreate, UserLoginData } from "./types";
import LarpDetailPage from "./views/LarpDetailPage";


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
            <Route path='/events/create' element={<NewEventPage />} />
        </>
    );

    const adminRoutes = (
        <>
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
                <Route path='/events/:id' element={<LarpDetailPage />} />
                <Route path='*' element={<HomePage />} />
            </Routes>
        </>
    );
}

export default RoutesList;