import React from 'react';
import logo from './../../assets/images/logo.png';

const ApplicationLogo = (props) => {
    return (
        <img {...props} src={logo} alt="Logo"/>
    );
};

export default ApplicationLogo;