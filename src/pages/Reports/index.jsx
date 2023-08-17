import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";
import api from "../../services/api";

const Index = () => {
    const {t} = useTranslation();
    usePageTitle(t("Interface.SideBar.Reports"));
    useEffect(() => {
        api.get('/reports').then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }, []);
    return (
        <div>
            Reports
        </div>
    );
};

export default Index;