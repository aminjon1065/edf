import React, {useState, Fragment, useEffect} from 'react';
import {
    CalendarIcon,
    ChartBarIcon,
    InboxIcon,
    XCircleIcon,
    MagnifyingGlassIcon,
    BellIcon,
    Bars3Icon,
    DocumentIcon,
    PaperAirplaneIcon,
    UsersIcon,
    CogIcon,
    ArrowLeftOnRectangleIcon,
    EnvelopeIcon,
    ClockIcon
} from "@heroicons/react/24/outline";
import {Dialog, Menu, Transition} from '@headlessui/react'
import ApplicationLogo from "./ApplicationLogo";
import {Link, useLocation} from "react-router-dom";
import Modal from "../NewMailModal";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import i18n from "../../localization/i18n";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SideBarWithHeader = () => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [currentRoute, setCurrentRoute] = useState("/");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const meSelector = useSelector(state => state.auth);
    const {t} = useTranslation();
    const navigation = [
        {name: t("Interface.SideBar.Inbox"), href: '/', icon: InboxIcon, current: true},
        {name: t("Interface.SideBar.Sent"), href: '/sent', icon: PaperAirplaneIcon, current: false},
        {name: t("Interface.SideBar.Files"), href: '/files', icon: DocumentIcon, current: false},
        // {name: 'Документы', href: '/documents', icon: DocumentIcon, current: false},
        {name: t("Interface.SideBar.Calendar"), href: '/calendar', icon: CalendarIcon, current: false},
        {name: t("Interface.SideBar.Reports"), href: '/reports', icon: ChartBarIcon, current: false},
    ]

    const userNavigation = [
        {name: t("Interface.Header.Profile"), href: '/profile', icon: UsersIcon},
        {name: t("Interface.Header.Settings"), href: '/settings', icon: CogIcon},
        {name: t("Interface.Header.Logout"), href: '/log-out', icon: ArrowLeftOnRectangleIcon},
    ]
    useEffect(() => {
        // Get the current path from the location object
        const currentPath = location.pathname;

        // Find the item in the navigation array that matches the current path
        const currentNavItem = navigation.find((item) => item.href === currentPath);

        // If the currentNavItem is found, update the currentRoute state
        if (currentNavItem) {
            setCurrentRoute(currentNavItem.href);
        }
    }, [location.pathname]);
    const showModal = () => {
        setOpen(true);
    };
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lang", lng);
    }
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XCircleIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <ApplicationLogo className={"h-8 w-auto"}/>
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2 space-y-1">
                                    <div className="flex justify-start mb-5">
                                        <div>
                                            <button
                                                className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-600 flex"
                                                onClick={showModal}
                                            >
                                                <EnvelopeIcon className="block h-6 w-6 mr-2" aria-hidden="true"/>
                                                {t("Interface.SideBar.NewMail")}
                                            </button>
                                            <Modal open={open} setOpen={setOpen}/>
                                        </div>
                                    </div>
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.href === currentRoute ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.href === currentRoute ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                    'mr-4 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                        <ApplicationLogo className={"h-8 w-auto"}/>
                        <h6 className={"text-white ml-5"}>CoES</h6>
                    </div>
                    <div className="flex-1 flex flex-col overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 space-y-1">
                            <div className="flex justify-start mb-5">
                                <div className={"w-full"}>
                                    <button
                                        className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-600 flex w-full"
                                        onClick={showModal}
                                    >
                                        <EnvelopeIcon className="block h-6 w-6 mr-2" aria-hidden="true"/>
                                        {t("Interface.SideBar.NewMail")}
                                    </button>
                                    <Modal open={open} setOpen={setOpen}/>
                                </div>
                            </div>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.href === currentRoute ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            item.href === currentRoute ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                            'mr-3 flex-shrink-0 h-6 w-6'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className={"flex flex-row justify-center space-x-2 mb-5"}>
                            <button
                                onClick={() => changeLanguage('tj')}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <span>Тоҷикӣ</span>
                            </button>
                            <button
                                onClick={() => changeLanguage('ru')}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <span>Русский</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:pl-64 flex flex-col">
                <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            {/*<form className="w-full flex md:ml-0" action="#" method="GET">*/}
                            {/*    <label htmlFor="search-field" className="sr-only">*/}
                            {/*        {t("Interface.Header.Search")}*/}
                            {/*    </label>*/}
                            {/*    <div className="relative w-full text-gray-400 focus-within:text-gray-600">*/}
                            {/*        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">*/}
                            {/*            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true"/>*/}
                            {/*        </div>*/}
                            {/*        <input*/}
                            {/*            id="search-field"*/}
                            {/*            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"*/}
                            {/*            placeholder={t("Interface.Header.Search")}*/}
                            {/*            type="search"*/}
                            {/*            name="search"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</form>*/}
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <Link
                                to={"/"}
                                type="button"
                                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="sr-only">View notifications</span>
                                <span
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-indigo-800">
                                    <span>10</span>
                                        <svg
                                            className=" h-2 w-2 text-indigo-400"
                                            fill="currentColor"
                                            viewBox="0 0 8 8">
                                          <circle cx={4} cy={4} r={3}/>
                                        </svg>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                        </span>
                            </Link>
                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button
                                        className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="mr-2">{
                                            meSelector.user?.full_name
                                        }</span>
                                        <ApplicationLogo
                                            className="h-8 w-8 rounded-full"
                                            alt="Logo"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name} cla>
                                                {({active}) => (
                                                    <Link
                                                        to={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'px-4 py-2 text-sm text-gray-700 flex flex-row'
                                                        )}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'h-4 w-auto mr-2'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBarWithHeader;