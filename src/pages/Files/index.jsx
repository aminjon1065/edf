import React, {useEffect, useState} from 'react';
import usePageTitle from "../../hooks/usePageTitle";
import api from "../../services/api";
import ItemFile from "../../components/ItemFile";
import {PUBLIC_APP_URL_DOCUMENTS} from "../../helpers/CONSTANTS";
import Loader from "../../components/UI/Loader";
import {useTranslation} from "react-i18next";

const Index = () => {
    usePageTitle('Файлы');
    const [files, setFiles] = useState([]);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const {t} = useTranslation();
    useEffect(() => {
        fetchFiles();
    }, [currentPage]);
    const fetchFiles = () => {
        api.get(`get-files?page=${currentPage}`).then((response) => {
            setFiles(response.data.data);
            setData(response.data);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < data.last_page) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <>
            {
                loading ?
                    <Loader/>
                    :
                    <>
                        {
                            data.data.length === 0 ?
                                <p className="text-center text-gray-500 py-5">{t("Interface.FeedBack.EmptyFiles")}</p>
                                :
                                <>
                                    <ul role="list"
                                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                        {
                                            files.map((file) => {
                                                return <ItemFile key={file.id}
                                                                 source={`${PUBLIC_APP_URL_DOCUMENTS}${file.user.region}/${file.folder}/${file.name}`}
                                                                 size={file.size} extens={file.extension}
                                                                 title={file.name}/>
                                            })
                                        }
                                    </ul>
                                    <nav
                                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-10"
                                        aria-label="Pagination"
                                    >
                                        <div className="hidden sm:block">
                                            <p className="text-sm text-gray-700">
                                                {t("Interface.Showed")} <span
                                                className="font-medium">{data.to}</span> {t("Interface.from")}{' '}
                                                <span
                                                    className="font-medium">{data.total}</span> {t("Interface.Results")}
                                            </p>
                                        </div>
                                        <div className="flex-1 flex justify-between sm:justify-end">
                                            <button
                                                disabled={currentPage <= 1}
                                                onClick={handlePrevPage}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                {t("Interface.Prev")}
                                            </button>
                                            <button
                                                onClick={handleNextPage}
                                                disabled={currentPage >= data.last_page}
                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                            >
                                                {t("Interface.Next")}
                                            </button>
                                        </div>
                                    </nav>
                                </>

                        }

                    </>
            }
        </>
    );
};

export default Index;