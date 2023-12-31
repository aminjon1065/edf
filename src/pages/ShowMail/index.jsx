import React, {Fragment, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useGetInboxByIdQuery} from '../../services/show.mail.service';
import ApplicationLogo from '../../components/UI/ApplicationLogo';
import dateFormatter from '../../helpers/dateFormatter';
import Loader from '../../components/UI/Loader';
import {CheckCircleIcon, ClockIcon, PaperClipIcon, TrashIcon, UserIcon} from '@heroicons/react/24/outline';
import {API_APP, PUBLIC_APP_URL_DOCUMENTS, PUBLIC_URL_BACKEND} from '../../helpers/CONSTANTS';
import api from '../../services/api';
import usePageTitle from '../../hooks/usePageTitle';
import PDFViewer from '../../components/FileViewer';
import ReplyMailModal from '../../components/ReplyMailModal';
import {useSelector} from "react-redux";
import {fetchUsers} from "../../services/fetchUsers.service";
import Select from "react-tailwindcss-select";
import {useTranslation} from "react-i18next";
import i18n from "../../localization/i18n";

const Index = () => {
    const {t} = useTranslation();
    usePageTitle(t('Interface.ShowMail'));
    const location = useLocation();
    const mailId = location.pathname.replace(/\/show\//, '');
    const {data, isLoading, isError, refetch} = useGetInboxByIdQuery(mailId);
    const [modalOpen, setModalOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [fileExtension, setFileExtension] = useState('');
    const [reload, setReload] = useState(true);
    const [openReplyModal, setOpenReplyModal] = useState(false);
    const meSelector = useSelector(state => state.auth);
    const [userSelected, setUserSelected] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [managementId, setManagementId] = useState('');
    useEffect(() => {
        fetchUsers().then((res) => {
            setUsersList(res.data)
        });
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch, reload]);

    const handleFileClick = (url, exns) => {
        setFileUrl(url);
        setModalOpen(true);
        setFileExtension(exns);
    };

    // Обработчик изменения значения выбранных пользователей
    const handleChange = (value) => {
        setUserSelected(value);
    };

    const openedMail = (id) => {
        api
            .post(`/showed/${id}`)
            .then((res) => {
                console.log('res');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const toRaisReplyDocument = () => {
        const confirmation = window.confirm("Точно отправить председателю?")
        if (confirmation) {
            api.post(`/to-rais-reply/${mailId}`, {'management_id': managementId}).then((res) => {
                refetch();
                alert("Отправлено");
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const updateStatus = () => {
        api.post(`/update-status/${data.document.uuid}`).then((res) => {
            console.log(res);
            refetch()
        }).catch((err) => {
            console.log(err);
        });
    }
    const handleChangeToRais = async () => {
        const formData = new FormData();
        if (userSelected.length > 0) {
            for (let i = 0; i < userSelected.length; i++) {
                formData.append('replyTo[]', userSelected[i].value);
            }
        }
        api.post(`/to-rais/${data.document.to_rais.id}`, formData, {
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

    const changeManagementId = (e) => {
        setManagementId(e.target.value);
        console.log(e.target.value);
    }
    const alertUpdateStatus = () => {
        const confirmation = window.confirm('Уверены что хотите изменить статус?');

        if (confirmation) {
            // Если пользователь подтвердил, вызываем функцию updateStatus
            updateStatus();
        }
    }
    if (data && !data.opened) {
        openedMail(data.uuid);
    }

    if (isError) {
        return <span>Ошибка!, Обновите страницу Пожалуйста</span>;
    }

    if (isLoading) {
        return <Loader/>;
    }

    const replyModalShow = () => {
        setOpenReplyModal(true); // open reply modal
    };

    // const documentTypeClasses = {
    //     'Министерства и Ведомства': 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
    //     Внутренные: 'bg-gradient-to-r from-slate-500 from-10% to-slate-700 text-white',
    //     Правительственные: 'bg-gradient-to-r from-pink-500 from-10% to-red-500 text-white',
    //     Гузориш: 'bg-gradient-to-r from-orange-500 from-10% to-amber-500 text-white',
    // };

    const RepliedToUsers = () => {
        const confirm = window.confirm("Отправить уведомление пользователей?")
        if (confirm) {
            api.post(`${API_APP}/reply-to-user/${data.document.uuid}`).then((res) => {
                console.log(res);
                refetch();
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    return (
        <div>
            <PDFViewer isOpen={modalOpen} onClose={() => setModalOpen(false)} fileUrl={fileUrl}
                       extension={fileExtension}/>
            <ReplyMailModal
                open={openReplyModal}
                setOpen={setOpenReplyModal}
                uuid={data.document.uuid}
                reload={reload}
                setReload={setReload}
            />
            <div className="flex flex-row justify-between items-center">
                <div className="">
                    <div className="flex flex-row">
                        <ApplicationLogo className="h-12 w-auto"/>
                        <div className="flex flex-col">
                            <span className="text-xl">{data.from_user.full_name}</span>
                            <span className="text-sm">{data.from_user.region}</span>
                        </div>
                    </div>
                </div>
                <span
                    className={`bg-gray-500 text-white px-4 py-2 rounded flex flex-row justify-around`}>
          {i18n.language === "ru" ? data.document.type_ru : data.document.type_tj}
                    {data.document.status === 'pending' ? <ClockIcon className={"h-6 w-auto text-white-500 ml-2"}/> :
                        <CheckCircleIcon className={"h-6 w-auto text-green-400 ml-2"}/>}
            </span>
                <div>
                    {
                        meSelector.user.role === 1 && <button
                            className={"bg-red-700 px-4 py-2 hover:bg-red-500 rounded text-white flex flex-row items-center"}
                            onClick={() => {
                                const confirmation = window.confirm('Уверены что хотите удалить?');
                                if (confirmation) {
                                    // Если пользователь подтвердил, вызываем функцию updateStatus
                                    api.delete(`/delete/${data.document.uuid}`).then((res) => {
                                        console.log(res);
                                        window.location.href = '/';
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                                }
                            }}
                        >
                            <TrashIcon className={"w-5 h-5 mr-2"} />
                            Delete
                        </button>
                    }
                    <div className="items-end">{dateFormatter(data.created_at)}</div>
                    {
                        data.document.control
                            ?
                            <div className={"flex flex-row justify-around"}>
                                <div className={"items-end p-1 bg-red-600 rounded text-white"}>
                                    {dateFormatter(data.document.date_done)}
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-3xl">{data.document.title}</h3>
            </div>
            <span>
                <div dangerouslySetInnerHTML={{__html: data.document.content}}></div>
            </span>
            <hr className="divide-y-4 divide-amber-500"/>
            <div>
                {data.document.file.length >= 1 ? (
                    <>
                        <div className="flex flex-row justify-between">
                            <div>
                                {data.document.file.length}
                                <span className="ml-2">{data.document.file.length > 1 ? 'Файлы' : 'Файл'}</span>
                            </div>
                            <div>
                                <a
                                    href={`${PUBLIC_URL_BACKEND}/api/download-all/${data.document.uuid}`}
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
                                {data.document.file.length > 0 ? (
                                    data.document.file.map((item) => (
                                        <li key={item.id}
                                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex flex-1 items-center">
                                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                               aria-hidden="true"/>
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">{item.name}</span>
                                                    <span className="flex-shrink-0 text-gray-400">{item.size} кб</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    href={`${PUBLIC_APP_URL_DOCUMENTS}${data.from_user.region}/${item.folder}/${item.name}`}
                                                    download
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Скачать
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        handleFileClick(
                                                            `${PUBLIC_APP_URL_DOCUMENTS}${data.from_user.region}/${item.folder}/${item.name}`,
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
            <div className="flex flex-row justify-between">
                <div className={'mt-10'}>
                    {
                        data.replyToUsers.length > 0 ?
                            <div className={"flex flex-row justify-between"}>
                                {
                                    data.document?.to_rais?.opened
                                        ?
                                        <span>
                                              Было перенаправлено:
                                            </span>
                                        :
                                        <span>
                                            Будет перенаправлено:
                                            < /span>
                                }
                                {
                                    meSelector.user.role === 1
                                        ?
                                        <>
                                            {
                                                data.document?.to_rais?.opened
                                                    ?
                                                    <CheckCircleIcon className={"w-5 h-5"}/>
                                                    :
                                                    <div className="ml-4 flex-shrink-0">
                                                        <button
                                                            className="ml-2 font-medium text-red-600 hover:text-red-500"
                                                            onClick={RepliedToUsers}
                                                            disabled={data.document?.to_rais?.opened}
                                                        >
                                                            Уведомить всех
                                                        </button>
                                                    </div>
                                            }
                                        </>
                                        :
                                        null
                                }
                            </div>
                            :
                            null
                    }
                    <div className="flex flex-row">
                        <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                            {data.replyToUsers.length > 0 ? (
                                data.replyToUsers.map((item) => (
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
                                ))
                            ) : null}
                        </ul>
                    </div>
                </div>
                <div className={'mt-10'}>
                    {
                        data.document?.to_rais?.user ?
                            <span>
                            Руководства:
                        </span>
                            :
                            null
                    }
                    <div className="flex flex-row">
                        <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                            {data.document?.to_rais?.user ?
                                <li
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
                                            {`${data.document.to_rais.user.full_name} - ${data.document.to_rais.user.position}(${data.document.to_rais.user.department})`}
                                        </span>
                                            <span
                                                className="flex-shrink-0 text-gray-400"
                                            >
                                            {data.document.to_rais.user.region}
                                        </span>
                                        </div>
                                    </div>
                                </li>
                                : null}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className="mt-10 flex flex-row justify-between">
                    <div>
                        <button
                            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg text-white"
                            disabled={data.document.status === "success"}
                            onClick={replyModalShow}
                        >
                            Ответить
                        </button>
                    </div>
                    {
                        meSelector.user.role === 1 &&
                        (
                            <>
                                <div className={"flex flex-row justify-around  items-center"}>
                                    <div
                                        className={"w-auto flex flex-row justify-end px-4 py-2"}>
                                        <div
                                            className="mt-1 rounded-md shadow-sm">
                                            <select
                                                value={managementId}
                                                onChange={changeManagementId}
                                                name="management_id"
                                                id="management_id"
                                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                                            >
                                                <option
                                                    disabled={true}
                                                    value="">
                                                    Выберите вариант
                                                </option>
                                                <option
                                                    value="3">
                                                    Muovin Muovinov
                                                </option>
                                                <option
                                                    value="4">Rais Raisov
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="px-4 py-2 bg-slate-500 rounded-lg text-white"
                                                disabled={data.toRais || managementId === ''}
                                                onClick={toRaisReplyDocument}
                                        >
                                            Перенаправить руководству
                                        </button>
                                    </div>
                                </div>


                                <div>
                                    <button className="px-4 py-2 bg-green-500 rounded-lg text-white"
                                            disabled={data.document.status === "success"}
                                            onClick={alertUpdateStatus}
                                    >
                                        Выполнена
                                    </button>
                                </div>
                            </>
                        )
                    }
                    {
                        meSelector.user.role === 99
                        &&
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
                                    disabled={data.document.status === "success"}
                                    onClick={handleChangeToRais}
                            >
                                Перенавправить
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className="mt-10 border-t">
                {data.document.reply_to_document.length > 0 ? (
                    <>
                        <span className="text-xl">Ответ к письму</span>
                        <Fragment>
                            {data.document.reply_to_document.map((item) => (
                                <div key={item.id} className="mt-10">
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="flex flex-row">
                                            <ApplicationLogo className="h-12 w-auto"/>
                                            <div className="flex flex-col">
                                                <span className="text-xl">{item.from_user.full_name}</span>
                                                <span className="text-sm">{item.from_user.region}</span>
                                            </div>
                                        </div>
                                        <div className="items-end">{dateFormatter(item.created_at)}</div>
                                    </div>
                                    <div className="mt-10">
                                        <h3 className="text-3xl">{item.document.title}</h3>
                                    </div>
                                    <span>
                    <div dangerouslySetInnerHTML={{__html: item.document.content}}></div>
                  </span>
                                    {
                                        item.document.file.length > 0
                                            ?
                                            <div className="flex flex-row justify-between">
                                                <div>
                                                    {item.document.file.length}
                                                    <span
                                                        className="ml-2">{item.document.file.length > 1 ? 'Файлы' : 'Файл'}</span>
                                                </div>
                                                <div>
                                                    <a
                                                        href={`${PUBLIC_URL_BACKEND}/download-all/${item.document.uuid}`}
                                                        className="text-blue-500 hover:text-blue-600"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Скачать всё
                                                    </a>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                    <div className="flex flex-row mt-10">
                                        <ul className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                            {item.document.file.length > 0 ? (
                                                item.document.file.map((file) => (
                                                    <li key={file.id}
                                                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                        <div className="flex flex-1 items-center">
                                                            <PaperClipIcon
                                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                                aria-hidden="true"/>
                                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                <span
                                                                    className="truncate font-medium">{file.name}</span>
                                                                <span
                                                                    className="flex-shrink-0 text-gray-400">{file.size} кб</span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4 flex-shrink-0">
                                                            <a
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                                href={`${PUBLIC_APP_URL_DOCUMENTS}${item.from_user.region}/${item.document.uuid}/${file.name}`}
                                                                download
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Скачать
                                                            </a>
                                                            <button
                                                                onClick={() =>
                                                                    handleFileClick(
                                                                        `${PUBLIC_APP_URL_DOCUMENTS}${item.from_user.region}/${file.folder}/${file.name}`,
                                                                        file.extension
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
                                </div>
                            ))}
                        </Fragment>
                    </>
                ) : null}
            </div>

        </div>
    );
};

export default Index;
