import React from 'react';
import {useTranslation} from "react-i18next";
import {CheckCircleIcon} from "@heroicons/react/24/outline";

const Index = () => {
    const {i18n} = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
    }
    const currentLang = i18n.language;
    return (
        <>
            <div>
                <div className="flex flex-row justify-end space-x-4">
                    <button
                        onClick={() => changeLanguage('tj')}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        {currentLang === 'tj' && <CheckCircleIcon className={"h-5 w-5 text-green-500"}/>}
                        <span>Тоҷикӣ</span>
                    </button>
                    <button
                        onClick={() => changeLanguage('ru')}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        {currentLang === 'ru' && <CheckCircleIcon className={"h-5 w-5 text-green-500"}/>}
                        <span>Русский</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Index;