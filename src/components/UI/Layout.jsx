import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import {openNotification} from "../../state/slices/notification";
import {useDispatch, useSelector} from "react-redux";
import NotificationNewMail from "./NotificationNewMail";
import Header from "./Header";
import SideBar from "./SideBar";
import SideBarWithHeader from "./SideBarWithHeader";

const Index = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState();
    const meSelector = useSelector(state => state.auth);
    const selectorNotification = useSelector(state => state.notificationModal);
    useEffect(() => {
        window.Echo.channel(`notification.${meSelector.user?.id}`)
            .listen('NotificationMail', (e) => {
                dispatch(openNotification(e.message));
                // setNotification(e.message)
                // setIsOpen(true)
            });
    }, [dispatch, meSelector.id]);
    return (
        <>
            <div className="min-h-full">
                <SideBarWithHeader />
                <div className="md:pl-64 flex flex-col flex-1">
                    <main className="flex-1">
                        <div className="py-6">
                            <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
                                {/* Replace with your content */}
                                <div className="">
                                    <NotificationNewMail
                                        isOpen={selectorNotification.isOpen}
                                        Notification={selectorNotification.uuid}
                                    />

                                    <Outlet/>
                                </div>
                                {/* /End replace */}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Index;