import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';
import {useSelector} from "react-redux";
import RaisInbox from "./RaisInbox";
import OtherInbox from "./OtherInbox";

const Index = () => {
    usePageTitle('Входящие');
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
