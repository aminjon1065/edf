import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon, ClockIcon, CheckCircleIcon} from '@heroicons/react/24/outline';
import {ChevronRightIcon} from '@heroicons/react/24/solid';
import {useNavigate} from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';
import {useGetMessagesQuery} from '../../services/getMails.service';
import Loader from './../../components/UI/Loader';
import Datepicker from 'react-tailwindcss-datepicker';
import {useSelector} from "react-redux";
import formatterDay from "../../helpers/dateFormatter";

const Index = () => {
    usePageTitle('Входящие');
    const navigate = useNavigate();
    const [column, setColumn] = useState('id');
    const [order, setOrder] = useState('desc');
    const [pageNum, setPageNum] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [dates, setDates] = useState({
        startDate: '',
        endDate: '',
    });
    const {data = [], isLoading, error, refetch} = useGetMessagesQuery({
        page: pageNum,
        order: order,
        column: column,
        searchQuery: searchText,
        startDate: !dates.startDate ? '' : dates.startDate,
        endDate: !dates.endDate ? '' : dates.endDate,
        type: 'inbox'
    });
    const selectorNotification = useSelector(state => state.notificationModal);

    useEffect(() => {
        refetch();
    }, [selectorNotification, refetch]);
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

    const lastPage = () => {
        setPageNum(data.last_page);
    };

    const firstPage = () => {
        setPageNum(1);
    };


    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    };

    const showMailItem = (uuid) => {
        navigate(`/show/${uuid}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader/>
            </div>
        );
    }

    const idColumnSorted = () => {
        setColumn('id');
        setOrder(order === 'asc' ? 'desc' : 'asc');
    };

    if (error) {
        return <span>Error!</span>;
    }
    return (
        <div className="flex flex-col">
            <div className="-my-2 scrollbar-none sm:-mx-6 lg:-mx-8 h-screen">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    {data.to && <span>{data.to} из {data.total}</span>}
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
                        </div>
                        <div className="flex justify-end">
                            <div className="relative mr-1">
                                <Datepicker
                                    separator="до"
                                    className="bg-red-700"
                                    i18n="ru"
                                    useRange
                                    showShortcuts={true}
                                    configs={{
                                        shortcuts: {
                                            today: 'Сегодня',
                                            yesterday: 'Вчера',
                                            past: (period) => `Последние ${period} дней`,
                                            currentMonth: 'Этот месяц',
                                            pastMonth: 'Прошлый месяц',
                                        },
                                    }}
                                    primaryColor="blue"
                                    value={dates}
                                    onChange={handleValueChange}
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                    {data.data.length > 0 ? (
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
                                        От куда
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        ТИП
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        статус
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Контрольный
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
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mail.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                                                {mail.from_user.full_name}
                                                <span className="text-indigo-500">({mail.from_user.region})</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span
                                                        className={`${
                                                            mail.document.type === 'Министерства и Ведомства'
                                                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                                                : mail.document.type === 'Внутренные'
                                                                    ? 'bg-gradient-to-r from-slate-500 from-10% to-slate-700 text-white'
                                                                    : mail.document.type === 'Правительственные'
                                                                        ? 'bg-gradient-to-r from-pink-500 from-10% to-red-500 text-white'
                                                                        : mail.document.type === 'Гузориш'
                                                                            ? 'bg-gradient-to-r from-orange-500 from-10% to-amber-500 text-white'
                                                                            : 'bg-gray-500'
                                                        } text-slate-950 px-4 py-2 rounded`}
                                                    >
                                                        {mail.document.type}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {mail.document.status === 'pending' ? <ClockIcon className={"h-8 w-auto text-orange-500"} /> : <CheckCircleIcon className={"h-8 w-auto text-green-600"} />}</td>
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
                            <span className="font-bold">Писем нет!</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;
