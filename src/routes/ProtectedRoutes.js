import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./../components/UI/Layout";
import NotFound from "./../pages/NotFound";
// import Calendar from "./../pages/Calendar";
import Reports from "./../pages/Reports";
import Documents from "./../pages/Documents";
import Inbox from "./../pages/Inbox";
import Sent from "./../pages/Sent";
import ShowMail from "./../pages/ShowMail";
import ShowRepliedToRais from "../pages/ShowMail/ShowRepliedToRais";
import Files from "../pages/Files";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import CreateUser from "../pages/CreateUser";
import Users from "../pages/Users";

const ProtectedRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<Inbox/>}/>
                    <Route path={'/show/:id'} element={<ShowMail/>}/>
                    <Route path={'/replied/:id'} element={<ShowRepliedToRais/>}/>
                    {/*<Route path={"calendar"} element={<Calendar/>}/>*/}
                    <Route path={"documents"} element={<Documents/>}/>
                    <Route path={"files"} element={<Files/>}/>
                    <Route path={"reports"} element={<Reports/>}/>
                    <Route path={"sent"} element={<Sent/>}/>
                    <Route path={"settings"} element={<Settings/>}/>
                    <Route path={"profile"} element={<Profile/>}/>
                    <Route path={"create-user"} element={<CreateUser/>}/>
                    <Route path={"users-list"} element={<Users/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default ProtectedRoutes;