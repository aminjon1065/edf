import React, {useEffect, useState} from 'react';
import {useGetMessagesQuery} from "../../services/getMails.service";
import {useNavigate} from "react-router-dom";
import {CheckCircleIcon, ChevronLeftIcon, ClockIcon} from "@heroicons/react/24/outline";
import formatterDay from "../../helpers/dateFormatter";
import Loader from "../../components/UI/Loader";
import {ChevronRightIcon} from "@heroicons/react/24/solid";
import Datepicker from "react-tailwindcss-datepicker";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {typeDocument} from "../../helpers/typeDocument";
import i18next from "i18next";
import i18n from "../../localization/i18n";

const OtherInbox = () => {
    const navigate = useNavigate();
    const [column, setColumn] = useState('id');
    const [order, setOrder] = useState('desc');
    const [pageNum, setPageNum] = useState(1);
    const [type, setType] = useState('')
    const [searchText, setSearchText] = useState('');
    const selectorNotification = useSelector(state => state.notificationModal);
    const [dates, setDates] = useState({
        startDate: '',
        endDate: '',
    });
    const {t} = useTranslation();
    const {data = [], isLoading, error, refetch} = useGetMessagesQuery({
        page: pageNum,
        type: type,
        order: order,
        column: column,
        searchQuery: searchText,
        startDate: !dates.startDate ? '' : dates.startDate,
        endDate: !dates.endDate ? '' : dates.endDate,
        request: 'inbox'
    });
    useEffect(() => {
        refetch();
    }, [selectorNotification, refetch]);
    const showMailItem = (uuid) => {
        navigate(`/show/${uuid}`);
    };
    const idColumnSorted = () => {
        setColumn('id');
        setOrder(order === 'asc' ? 'desc' : 'asc');
    };
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader/>
            </div>
        );
    }
    if (error) {
        return <span>Error!</span>;
    }
    const handleValueChange = (newValue) => {
        setDates(newValue);
    };

    const prevPage = () => {
        if (pageNum > 1) {
            setPageNum(pageNum - 1);
        }
    };

    const nextPage = () => {
        if (data.last_page_url) {
            setPageNum(pageNum + 1);
        }
    };

    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    };
    const handleChangeType = (event) => {
        setType(event.target.value);
    }
    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 scrollbar-none sm:-mx-6 lg:-mx-8 h-screen">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        {data.to && <span>{data.to} {t("Interface.from")} {data.total}</span>}
                        <div className="flex flex-row items-center justify-between mb-3">
                            <div className="flex justify-start">
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-indigo-700"
                                     aria-label="Pagination">
                                    <button
                                        disabled={!data.prev_page_url}
                                        onClick={prevPage}
                                        className={`relative bg-gray-100 inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                                    >
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                                    </button>
                                    {data.next_page_url && (
                                        <button
                                            onClick={nextPage}
                                            className="relative bg-gray-100 inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                                        </button>
                                    )}
                                </nav>
                                <div className={"ml-5"}>
                                    <select
                                        value={type}
                                        name="filterType"
                                        onChange={handleChangeType}
                                        id="filterType"
                                        className={"rounded w-1/3"}
                                    >
                                        <option
                                            value="">
                                            {t("Interface.All")}
                                        </option>
                                        {
                                            typeDocument.map((item, index) => (
                                                <option
                                                    value={item.code}
                                                    key={item.code}
                                                >
                                                    {item.code} - {i18next.language === "ru" ? item.type_ru : item.type_tj}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end w-2/3">
                                <div className="relative mr-1">
                                    <Datepicker
                                        separator="до"
                                        className="bg-red-700"
                                        i18n="ru"
                                        useRange
                                        showShortcuts={true}
                                        configs={{
                                            shortcuts: {
                                                today: t('Interface.DaysCalendar.Today'),
                                                yesterday: t('Interface.DaysCalendar.Yesterday'),
                                                // past: (period) => `Последние ${period} дней`,
                                                currentMonth: t('Interface.DaysCalendar.CurrentMonth'),
                                                pastMonth: t('Interface.DaysCalendar.PastMonth'),
                                            },
                                        }}
                                        primaryColor="blue"
                                        value={dates}
                                        onChange={handleValueChange}
                                    />
                                </div>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        id="default-search"
                                        value={searchText}
                                        onChange={handleSearchText}
                                        className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Поиск..."
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setSearchText('')}
                                        className="text-white absolute right-0.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            data.data.length > 0 ? (
                                <div className="shadow overflow-hidden border border-indigo-700 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-50">
                                        <thead className="bg-slate-100">
                                        <tr>
                                            <th
                                                scope="col"
                                                onClick={idColumnSorted}
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {t("Interface.Table.From")}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {t("Interface.Table.Type")}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {t("Interface.Table.Status")}
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {t("Interface.Table.Control")}
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="">Дата выполнения</span>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-50">
                                        {data.data.map((mail) =>
                                            mail.document ? (
                                                <tr
                                                    key={mail.id}
                                                    onClick={() => showMailItem(mail.uuid)}
                                                    className={`${mail.opened ? 'bg-slate-100' : 'bg-white'}  border-b border-gray-100 hover:bg-slate-300 cursor-pointer`}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mail.document.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                                                        {mail.from_user.full_name}
                                                        <span
                                                            className="text-indigo-500">({mail.from_user.region})</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span
                                                        className={`bg-gray-500 text-white px-4 py-2 rounded`}
                                                    >
                                                        {i18n.language === "ru" ?  mail.document.type_ru : mail.document.type_tj}
                                                    </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {mail.document.status === 'pending' ?
                                                            <ClockIcon className={"h-8 w-auto text-orange-500"}/> :
                                                            <CheckCircleIcon
                                                                className={"h-8 w-auto text-green-600"}/>}</td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 `}>
                                                    <span
                                                        className={`${
                                                            mail.document.control ? 'bg-red-500' : 'bg-gray-500'
                                                        } px-4 py-2 rounded text-white`}
                                                    >
                                                        {mail.document.control ? 'Да' : 'Нет'}
                                                    </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <span
                                                        className={` p-2 rounded text-white ${mail.document.date_done ? "bg-red-500" : 'bg-gray-500'}`}>
                                                        {mail.document.date_done ? formatterDay(mail.document.date_done) : 'Не контрольная'}
                                                    </span>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <span>NotFound</span>
                                            )
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="">
                                    <p className="text-center text-gray-500 py-5">{t("Interface.FeedBack.EmptyMail")}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

        </>
    );
};

export default OtherInbox;