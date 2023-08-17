import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import {useSelector} from "react-redux";
import RaisInbox from "./RaisInbox";
import OtherInbox from "./OtherInbox";
import {useTranslation} from "react-i18next";

const Index = () => {
    const {t} = useTranslation();
    usePageTitle(t("Interface.SideBar.Inbox"));
    const meSelector = useSelector(state => state.auth);
    return (
        meSelector.user.role === 99
            ?
            <RaisInbox/>
            :
            <OtherInbox/>
    );
};

export default Index;
