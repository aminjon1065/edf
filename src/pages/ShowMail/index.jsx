import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useGetInboxByIdQuery} from "../../services/show.mail.service";
import ApplicationLogo from "../../components/UI/ApplicationLogo";
import dateFormatter from "../../helpers/dateFormatter";
import Loader from "../../components/UI/Loader";
import {PaperClipIcon} from "@heroicons/react/24/outline";
import {PUBLIC_APP_URL_DOCUMENTS, PUBLIC_URL_BACKEND} from "../../helpers/CONSTANTS";
import api from "../../services/api";
import usePageTitle from "../../hooks/usePageTitle";
import PDFViewer from "../../components/FileViewer";
import ReplyMailModal from "../../components/ReplyMailModal";

const Index = () => {
    usePageTitle("Просмотр");
    const location = useLocation();
    const mailId = location.pathname.replace(/\/show\//, "");
    const {data, isLoading, isError, refetch} = useGetInboxByIdQuery(mailId);
    const [modalOpen, setModalOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [fileExtension, setFileExtension] = useState('');
    const [reload, setReload] = useState(true);
    const [openReplyModal, setOpenReplyModal] = useState(false)

    useEffect(() => {
        refetch()
    }, [refetch, reload]);
    const handleFileClick = (url, exns) => {
        setFileUrl(url);
        setModalOpen(true);
        setFileExtension(exns)
    };
    const openedMail = (id) => {
        api.post(`/showed/${id}`).then((res) => {
            console.log('res')
        }).catch((err) => {
            console.log(err)
        })
    }
    if (data) {
        if (!data.opened) {
            openedMail(data.uuid)
        }
    }

    if (isError) {
        return <span>Error!</span>
    }
    if (isLoading) {
        return <Loader/>
    }

    const replyModalShow = () => {
        setOpenReplyModal(true) // open reply modal
    }
    return (
        <div>
            <PDFViewer
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                fileUrl={fileUrl}
                extension={fileExtension}
            />
            <ReplyMailModal
                open={openReplyModal}
                setOpen={setOpenReplyModal}
                uuid={data.document.uuid}
                reload={reload}
                setReload={setReload}
                typeDocument={data.document.type}
            />
            <div className="flex flex-row justify-between items-center">
                <div className="">
                    <div className="flex flex-row">
                        <ApplicationLogo className={"h-12 w-auto"}/>
                        <div className={"flex flex-col"}>
                           <span className={"text-xl"}>
                               {data.from_user.full_name}
                           </span>
                            <span className={"text-sm"}>
                               {data.from_user.region}
                           </span>
                        </div>
                    </div>
                </div>
                <span
                    className={`${
                        data.document.type === 'Министерства и Ведомства'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                            : data.document.type === 'Внутренные'
                                ? 'bg-gradient-to-r from-slate-500 from-10% to-slate-700 text-white'
                                : data.document.type === 'Правительственные'
                                    ? 'bg-gradient-to-r from-pink-500 from-10% to-red-500 text-white'
                                    : data.document.type === 'Гузориш'
                                        ? 'bg-gradient-to-r from-orange-500 from-10% to-amber-500 text-white'
                                        : 'bg-gray-500'
                    } text-slate-950 px-4 py-2 rounded`}
                >
                   {data.document.type}
               </span>
                <div className="items-end">
                    {dateFormatter(data.created_at)}
                </div>
            </div>
            <div className={"mt-10"}>
                <h3 className={"text-3xl"}>
                    {data.document.title}
                </h3>
            </div>
            <span>
                <div dangerouslySetInnerHTML={{__html: data.document.content}}></div>
            </span>
            <hr className={"divide-y-4 divide-amber-500"}/>
            <div>
                {
                    data.document.file.length >= 1 ?
                        <>
                            <div className="flex flex-row justify-between">
                                <div>
                                    {data.document.file.length}
                                    <span className={"ml-2"}>
                                        {data.document.file.length > 1 ? 'Файлы' : 'Файл'}
                                    </span>
                                </div>
                                <div>
                                    <a
                                        href={`${PUBLIC_URL_BACKEND}/download-all/${data.document.uuid}`}
                                        className={"text-blue-500 hover:text-blue-600"}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                    >
                                        download all
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-row mt-10">
                                <ul
                                    className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    {data.document.file.length > 0 ? data.document.file.map((item) => (
                                        <li key={item.id}
                                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex flex-1 items-center">
                                                <PaperClipIcon
                                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                        <span
                                                            className="truncate font-medium"
                                                        >
                                                                    {item.name}
                                                        </span>
                                                    <span
                                                        className="flex-shrink-0 text-gray-400"
                                                    >
                                                                    {item.size} кб
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a
                                                    rel={"noopener noreferrer"}
                                                    target={"_blank"}
                                                    href={`${PUBLIC_APP_URL_DOCUMENTS}${data.from_user.region}/${data.document.uuid}/${item.name}`}
                                                    download
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Скачать
                                                </a>
                                                <button
                                                    onClick={() => handleFileClick(`${PUBLIC_APP_URL_DOCUMENTS}${data.from_user.region}/${data.document.uuid}/${item.name}`, item.extension)}
                                                    className={"ml-2 font-medium text-green-600 hover:text-green-500"}
                                                >
                                                    Просмотреть
                                                </button>
                                            </div>
                                        </li>)) : <span>Файлов нет!</span>}
                                </ul>
                            </div>
                        </>
                        :
                        null

                }
            </div>
            <div>
                <div className={"mt-10"}>
                    <button
                        className={"px-4 py-2 bg-blue-700 rounded-lg text-white"}
                        onClick={replyModalShow}
                    >
                        Ответить
                    </button>
                </div>
            </div>
            <div className={"mt-10 border-t"}>
                {
                    data.document.reply_to_document.length > 0 ?
                        <>
                          <span className={"text-xl"}>
                              Ответ к письму
                          </span>
                            <Fragment>
                                {
                                    data.document.reply_to_document.map((item) => (
                                        <div key={item.id} className={"mt-10"}>
                                            <div className="flex flex-row justify-between items-center">
                                                <span>{item.title}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </Fragment>
                        </>
                        :
                        null
                }
            </div>
        </div>
    );
};

export default Index;