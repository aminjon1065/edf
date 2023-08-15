import React from 'react';
import {useTranslation} from "react-i18next";

const AuthCard = ({logo, children}) => {
    const {i18n} = useTranslation();
    return (
        <>

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div>{logo}</div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className={"flex flex-row justify-center space-x-2"}>
                        <button
                            onClick={() => i18n.changeLanguage('tj')}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <span>Тоҷикӣ</span>
                        </button>
                        <button
                            onClick={() => i18n.changeLanguage('ru')}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <span>Русский</span>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )

}

export default AuthCard
