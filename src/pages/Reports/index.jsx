import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import usePageTitle from "../../hooks/usePageTitle";
import api from "../../services/api";
import Datepicker from "react-tailwindcss-datepicker";
import {useGetReportsQuery} from "../../services/getReports.service";
import {typeDocument} from "../../helpers/typeDocument";
import i18next from "i18next";
import Loader from "../../components/UI/Loader";
import i18n from "../../localization/i18n";

const Index = () => {
    const {t} = useTranslation();
    usePageTitle(t("Interface.SideBar.Reports"));
    const [field, setField] = useState("from");
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const [dates, setDates] = useState({
        startDate: firstDayOfMonth.toISOString().split('T')[0],  // Convert date object to yyyy-mm-dd format
        endDate: currentDate.toISOString().split('T')[0],        // Convert date object to yyyy-mm-dd format
    });
    const handleValueChange = (newValue) => {
        setDates(newValue);
    };
    const {data = [], isLoading, error, refetch} = useGetReportsQuery({
        field: field,
        start: dates.startDate,
        end: dates.endDate
    })
    const handleChangeField = (e) => {
        setField(e.target.value);
    }
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
    const downloadPdf = () => {
        api.get(`/pdf-reports/${i18n.language}`, {responseType: 'blob'})
            .then((response) => {
                // Создаем URL-объект из blob ответа
                const url = window.URL.createObjectURL(new Blob([response.data]));

                // Создаем ссылку DOM и программно кликаем по ней
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report.pdf');
                document.body.appendChild(link);
                link.click();

                // Удаляем ссылку для освобождения памяти
                link.parentNode.removeChild(link);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="w-1/3">
                    <div className={"ml-5"}>
                        <select
                            value={field}
                            name="filterType"
                            onChange={handleChangeField}
                            id="filterField"
                            className={"rounded w-1/3"}
                        >
                            <option
                                value="from">
                                {t("Interface.SideBar.Sent")}
                            </option>
                            <option
                                value="to">
                                {t("Interface.SideBar.Inbox")}
                            </option>
                        </select>
                    </div>
                </div>
                <div className="relative mr-1 w-1/3">
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
            </div>

            <ul role="list" className="divide-y divide-gray-100">
                {
                    data.length === 0 ?
                        <p className="text-center text-gray-500 py-5">{t("Interface.FeedBack.EmptyReports")}</p> :
                        data.map((item, index) => (
                            <li key={index} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{i18n.language === "ru" ? item.type_ru : item.type_tj}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">{item.count}</p>
                                </div>
                            </li>
                        ))
                }
            </ul>
            <div className={"float-right mt-5"}>
                <button
                    onClick={downloadPdf}
                    disabled={data.length === 0}
                    className={"bg-slate-950 px-4 py-2 rounded text-white hover:bg-slate-800"}
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default Index;