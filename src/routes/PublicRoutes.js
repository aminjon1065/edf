import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import PublicLayout from "../components/UI/PublicLayout";

const PublicRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<PublicLayout/>}>
                    <Route index element={<Login/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default PublicRoutes;