import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import {useGetRepliedByIdQuery} from '../../services/show.replied.service';
import PDFViewer from "../../components/FileViewer";
import ApplicationLogo from "../../components/UI/ApplicationLogo";
import {CheckCircleIcon, ClockIcon, PaperClipIcon, UserIcon} from "@heroicons/react/24/outline";
import dateFormatter from "../../helpers/dateFormatter";
import {PUBLIC_APP_URL_DOCUMENTS, PUBLIC_URL_BACKEND} from "../../helpers/CONSTANTS";
import Select from "react-tailwindcss-select";
import api from "../../services/api";
import {fetchUsers} from "../../services/fetchUsers.service";

const ShowRepliedToRais = ({id}) => {
    usePageTitle("Перенаправить");
    const [modalOpen, setModalOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [fileExtension, setFileExtension] = useState('');
    const [reload, setReload] = useState(true);
    const [dateDone, setDateDone] = useState('');
    const [userSelected, setUserSelected] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const location = useLocation();
    const repliedId = location.pathname.replace(/\/replied\//, '');
    const {data, isLoading, isError, refetch} = useGetRepliedByIdQuery(repliedId);
    useEffect(() => {
        fetchUsers().then((res) => {
            setUsersList(res.data)
        });
    }, []);
    const handleChangeDateDone = (e) => {
        setDateDone(e.target.value)
    }

    if (isLoading) {
        return <span>loading</span>
    }

    if (isError) {
        return <span>error</span>
    }
    const documentTypeClasses = {
        'Министерства и Ведомства': 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
        Внутренные: 'bg-gradient-to-r from-slate-500 from-10% to-slate-700 text-white',
        Правительственные: 'bg-gradient-to-r from-pink-500 from-10% to-red-500 text-white',
        Гузориш: 'bg-gradient-to-r from-orange-500 from-10% to-amber-500 text-white',
    };
    const handleFileClick = (url, exns) => {
        setFileUrl(url);
        setModalOpen(true);
        setFileExtension(exns);
    };
    const handleChange = (value) => {
        setUserSelected(value);
    };
    const handleChangeControlDocument = async () => {
        const confirm = window.confirm("Задать контрольную дату для документа?")
        if (confirm) {
            const formData = new FormData();
            formData.append('date_done', dateDone);
            api.post(`/update-control/${data.toRais.document.uuid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                alert('Контрольная дата спешно задано')
                setDateDone(null)
                refetch();
            }).catch((error) => {
                setDateDone(null);
                console.log(error)
            })
        }

    }
    const handleChangeToRais = async () => {
        const formData = new FormData();
        if (userSelected.length > 0) {
            for (let i = 0; i < userSelected.length; i++) {
                formData.append('replyTo[]', userSelected[i].value);
            }
        }
        api.post(`/to-rais/${data.toRais.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            setUserSelected(null);
            console.log(response);
            refetch();
        }).catch((error) => {
            setUserSelected(null);
            console.log(error)
        })
    }
    return (
        <>
            <div>
                <PDFViewer isOpen={modalOpen} onClose={() => setModalOpen(false)} fileUrl={fileUrl}
                           extension={fileExtension}/>
                <div className="flex flex-row justify-between items-center">
                    <div className="">
                        <div className="flex flex-row">
                            <ApplicationLogo className="h-12 w-auto"/>
                            <div className="flex flex-col">
                                <span className="text-xl">{data.toRais.document.user.full_name}</span>
                                <span className="text-sm">{data.toRais.document.user.region}</span>
                            </div>
                        </div>
                    </div>
                    <span
                        className={`${documentTypeClasses[data.toRais.document.type] || 'bg-gray-500'} text-slate-950 px-4 py-2 rounded flex flex-row justify-around`}>
                        {data.toRais.document.type}
                        {data.toRais.document.status === 'pending' ?
                            <ClockIcon className={"h-6 w-auto text-white-500 ml-2"}/> :
                            <CheckCircleIcon className={"h-6 w-auto text-green-400 ml-2"}/>}
                    </span>
                    <div>
                        <div className="items-end p-1">{dateFormatter(data.toRais.created_at)}</div>
                        {
                            data.toRais.document.control
                                ?
                                <div className={"flex flex-row justify-around"}>
                                    <div className={"items-end p-1 bg-red-600 rounded text-white"}>
                                        {dateFormatter(data.toRais.document.date_done)}
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
                <div className="mt-10">
                    <h3 className="text-3xl">{data.toRais.document.title}</h3>
                </div>
                <span>
                    <div dangerouslySetInnerHTML={{__html: data.toRais.document.content}}></div>
                </span>
                <hr className="divide-y-4 divide-amber-500"/>
                <div>
                    {data.toRais.document.file.length >= 1 ? (
                        <>
                            <div className="flex flex-row justify-between">
                                <div>
                                    {data.toRais.document.file.length}
                                    <span
                                        className="ml-2">{data.toRais.document.file.length > 1 ? 'Файлы' : 'Файл'}</span>
                                </div>
                                <div>
                                    <a
                                        href={`${PUBLIC_URL_BACKEND}/download-all/${data.toRais.document.uuid}`}
                                        className="text-blue-500 hover:text-blue-600"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Скачать всё
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-row mt-10">
                                <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                    {data.toRais.document.file.length > 0 ? (
                                        data.toRais.document.file.map((item) => (
                                            <li key={item.id}
                                                className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                <div className="flex flex-1 items-center">
                                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                                   aria-hidden="true"/>
                                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                        <span className="truncate font-medium">{item.name}</span>
                                                        <span
                                                            className="flex-shrink-0 text-gray-400">{item.size} кб</span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        href={`${PUBLIC_APP_URL_DOCUMENTS}${data.toRais.document.user.region}/${data.toRais.document.uuid}/${item.name}`}
                                                        download
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Скачать
                                                    </a>
                                                    <button
                                                        onClick={() =>
                                                            handleFileClick(
                                                                `${PUBLIC_APP_URL_DOCUMENTS}${data.toRais.document.user.region}/${item.folder}/${item.name}`,
                                                                item.extension
                                                            )
                                                        }
                                                        className="ml-2 font-medium text-green-600 hover:text-green-500"
                                                    >
                                                        Просмотреть
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <span>Файлов нет!</span>
                                    )}
                                </ul>
                            </div>
                        </>
                    ) : null}
                </div>

                {data.replyToUsers.length > 0 ? (
                    <div className={'mt-10'}>
                        <span>
                            Было перенаправлено:
                        </span>
                        <div className="flex flex-row">
                            <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                {data.replyToUsers.map((item) => (
                                    <li key={item.id}
                                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex flex-1 items-center">
                                            <UserIcon
                                                className="h-5 w-5 flex-shrink-0 text-gray-900"
                                                aria-hidden="true"
                                            />
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span
                                                    className="truncate font-medium"
                                                >
                                                    {`${item.full_name} - ${item.position}(${item.department})`}
                                                </span>
                                                <span
                                                    className="flex-shrink-0 text-gray-400"
                                                >
                                                    {item.region}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : null}
                <div>
                    <div className="mt-10 flex flex-row justify-between">

                        <div className={"flex flex-row items-center"}>
                            <div className="">
                                <div>
                                    <input
                                        disabled={data.toRais.document.control}
                                        id="dateDone"
                                        value={dateDone}
                                        onChange={handleChangeDateDone}
                                        type="datetime-local"
                                        className={"rounded-xl focus:border-indigo-500"}/>
                                </div>
                            </div>
                            <button
                                disabled={data.toRais.document.control}
                                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg text-white ml-2"
                                onClick={handleChangeControlDocument}
                            >
                                Задать дату
                            </button>
                        </div>
                        <div className={"w-1/3 flex flex-row items-center"}>
                            <Select
                                id={"username"}
                                primaryColor={"indigo"}
                                noOptionsMessage={"Такого пользователя не существует"}
                                searchInputPlaceholder={""}
                                isSearchable
                                isMultiple
                                value={userSelected}
                                onChange={handleChange}
                                options={usersList}
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                            />
                            <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg text-white ml-2"
                                    disabled={data.toRais.document.status === "success"}
                                    onClick={handleChangeToRais}
                            >
                                Перенавправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowRepliedToRais;