import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {openNotification} from "../../state/slices/notification";
import {useDispatch, useSelector} from "react-redux";
import NotificationNewMail from "./NotificationNewMail";
import SideBarWithHeader from "./SideBarWithHeader";
import {BsGithub} from "react-icons/bs";

const Index = () => {
    const dispatch = useDispatch();
    const meSelectorId = useSelector(state => state.auth.user.id);
    const meSelectorRole = useSelector(state => state.auth.user.role);
    const selectorNotification = useSelector(state => state.notificationModal);
    useEffect(() => {
        window.Echo.channel(`notification.${meSelectorId}`)
            .listen('NotificationSharedMail', (e) => {
                dispatch(openNotification(e.message));
                // setNotification(e.message)
                // setIsOpen(true)
            });
    }, [dispatch, meSelectorId]);
    return (
        <>
            <div className="min-h-full">
                <SideBarWithHeader/>
                <div className="md:pl-64 flex flex-col flex-1">
                    <main className="flex-1">
                        <div className="py-6">
                            <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
                                {/* Replace with your content */}
                                <div>
                                    {
                                        meSelectorRole === 99
                                            ?
                                            null
                                            :
                                            <NotificationNewMail
                                                isOpen={selectorNotification.isOpen}
                                                Notification={selectorNotification.uuid}
                                            />
                                    }
                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="bg-white">
                        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                            <div className="flex justify-center space-x-6 md:order-2">
                                <a href="https://github.com/aminjon1065" target={"_blank"} rel="noreferrer" className={""}><BsGithub className={"text-purple-700 w-3 h-3"} /></a>
                            </div>
                            <div className="mt-8 md:mt-0 md:order-1">
                                <p className="text-center text-base text-gray-400 sr-only">&copy; {new Date().getFullYear()}</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Index;