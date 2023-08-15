import React from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import formatterDay from "../helpers/dateFormatter";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CalendarComponent = ({days, goToNextMonth, goToPreviousMonth}) => {
    console.log(days);
    return (
        <div>
            <div className="lg:flex lg:h-full lg:flex-col">
                <header
                    className="relative z-20 flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none">
                    <h1 className="text-lg font-semibold text-gray-900">
                        <time dateTime="2022-01">January 2022</time>
                    </h1>
                    <div className="flex items-center">
                        <div className="flex items-center rounded-md shadow-sm md:items-stretch">
                            <button

                                onClick={goToPreviousMonth}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true"/>
                                Предыдущий
                            </button>
                            <button

                                onClick={goToNextMonth}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Следующий
                                <ChevronRightIcon className="h-4 w-4" aria-hidden="true"/>
                            </button>
                            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"/>
                        </div>
                    </div>
                </header>
                <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                    <div
                        className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                        <div className="bg-white py-2">
                            Понедельник
                        </div>
                        <div className="bg-white py-2">
                            Вторник
                        </div>
                        <div className="bg-white py-2">
                            Среда
                        </div>
                        <div className="bg-white py-2">
                            Четверг
                        </div>
                        <div className="bg-white py-2">
                            Пятница
                        </div>
                        <div className="bg-white py-2">
                            Суботта
                        </div>
                        <div className="bg-white py-2">
                            Воскресенья
                        </div>
                    </div>
                    <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
                        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                            {days.map((day, index) => (
                                <div
                                    key={index}
                                    className={classNames(
                                        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                                        'relative py-2 px-3'
                                    )}
                                >
                                    <time
                                        dateTime={day.date}
                                        className={
                                            day.isToday
                                                ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                                                : undefined
                                        }
                                    >
                                        {day.date.split('-').pop().replace(/^0/, '')}
                                    </time>
                                    {day.events.length > 0 && (
                                        <ol className="mt-2">
                                            {day.events.slice(0, 2).map((event, index) => (
                                                <li key={index}>
                                                    <a href={event.href} className="group flex">
                                                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                                            {event.name}
                                                        </p>
                                                        <time
                                                            dateTime={event.datetime}
                                                            className={`ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block ${event.date_done ? 'bg-red-700 text-white px-2 rounded group-hover:text-red-300' : null}`}
                                                        >
                                                            {formatterDay(event.created_at)}
                                                        </time>
                                                    </a>
                                                </li>
                                            ))}
                                            {day.events.length > 2 &&
                                                <li className="text-gray-500">больше {day.events.length - 2} +</li>}
                                        </ol>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                            {days.map((day, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={classNames(
                                        day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                                        (day.isSelected || day.isToday) && 'font-semibold',
                                        day.isSelected && 'text-white',
                                        !day.isSelected && day.isToday && 'text-indigo-600',
                                        !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                                        !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-500',
                                        'flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10'
                                    )}
                                >
                                    <time
                                        dateTime={day.date}
                                        className={classNames(
                                            day.isSelected && 'flex h-6 w-6 items-center justify-center rounded-full',
                                            day.isSelected && day.isToday && 'bg-indigo-600',
                                            day.isSelected && !day.isToday && 'bg-gray-900',
                                            'ml-auto'
                                        )}
                                    >
                                        {day.date.split('-').pop().replace(/^0/, '')}
                                    </time>
                                    <p className="sr-only">{day.events.length} events</p>
                                    {day.events.length > 0 && (
                                        <div className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                            {day.events.map((event, index) => (
                                                <div key={index}
                                                     className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"/>
                                            ))}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;