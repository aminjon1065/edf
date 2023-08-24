import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {openNotification} from "../../state/slices/notification";
import {useDispatch, useSelector} from "react-redux";
import NotificationNewMail from "./NotificationNewMail";
import SideBarWithHeader from "./SideBarWithHeader";

const Index = () => {
    const dispatch = useDispatch();
    const meSelectorId = useSelector(state => state.auth.user.id);
    const meSelectorRole = useSelector(state => state.auth.user.role);
    const selectorNotification = useSelector(state => state.notificationModal);
    useEffect(() => {
        let pusher = new window.Pusher('7df99e1bf3471243c810', {
            cluster: 'ap1'
        });
        let channel = pusher.subscribe(`notification.${meSelectorId}`);
        channel.bind('my-event', (data) => {
            dispatch(openNotification(data.message));
        });
        // window.Echo.channel(`notification.${meSelectorId}`)
        //     .listen('NotificationSharedMail', (e) => {
        //         dispatch(openNotification(e.message));
        //         // setNotification(e.message)
        //         // setIsOpen(true)
        //     });
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
                                <div className="">
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