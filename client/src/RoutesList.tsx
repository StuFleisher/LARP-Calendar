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
import OrgDetailPage from "./views/OrgDetailPage";
import CreateOrgPage from "./views/CreateOrgPage";
import EditOrgPage from "./views/EditOrgPage";
import EditLarpImagePage from "./views/EditLarpImagePage";
import UserRegistrationForm from "./components/Forms/RegisterForm";
import LogOutPage from "./views/LogOutPage";
import EditOrgImagePage from "./views/EditOrgImagePage";


type RoutesListProps = {
    login: (credentials: UserLoginData) => Promise<void>,
    register: (userInfo: UserForCreate) => Promise<void>;
    logout: () => void;
};

function RoutesList({ login, register, logout }: RoutesListProps) {
    const { username, isAdmin, organization } = useContext(userContext);
    const isOrganizer = organization?.isApproved;

    const anonRoutes = (
        <>
            <Route path='/auth/login' element={<LoginForm login={login} />} />
            <Route path='/auth/register' element={<UserRegistrationForm register={register} />} />
        </>
    );

    const loginRoutes = (
        <>
        <Route path='/orgs/apply' element={<CreateOrgPage />} />
        <Route path='/orgs/:id/edit' element={<EditOrgPage />} />
        <Route path='/orgs/:id/image' element={<EditOrgImagePage />} />
        <Route path='/auth/logout' element={<LogOutPage logOut={logout} />} />
        </>
    );

    const approvedOrganizerRoutes = (
        <>
            <Route path='/events/:id/edit' element={<EditLarpPage />} />
            <Route path='/events/:id/image' element={<EditLarpImagePage />} />
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
                {isOrganizer ? approvedOrganizerRoutes : ""}
                {isAdmin ? adminRoutes : ""}
                {/* <Route path='/events/create' element={<NewEventPage />} /> */}
                <Route path='/orgs/:id' element={<OrgDetailPage />} />
                <Route path='/events' element={<LarpListPage />} />
                <Route path='/events/:id' element={<LarpDetailPage />} />
                <Route path='*' element={<HomePage />} />
            </Routes>
        </>
    );
}

export default RoutesList;