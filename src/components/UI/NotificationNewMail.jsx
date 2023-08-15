import React, {Fragment, useEffect, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {closeNotification} from "../../state/slices/notification";
import notificationSound from "./../../assets/sound/notification.mp3";

const NotificationNewMail = ({isOpen, Notification}) => {
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch();
    const setIsOpen = () => {
        dispatch(closeNotification())
    }
    useEffect(() => {
        if (isOpen) {
            const audio = new Audio(notificationSound);
            audio.autoplay = true;
        }
    }, [isOpen]);
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:w-full md:max-w-md">
                                <div className="p-5 flex justify-center items-center w-full">
                                    <div className={"w-full text-center"}>
                                        <h3>
                                            Вам пришло новое письмо
                                        </h3>
                                        <span>
                                                Хотите посмотреть?
                                        </span>
                                        <div className={"flex flex-row justify-between w-full mt-5"}>
                                            <button className={"px-4 py-2 rounded bg-blue-500"}>
                                                <Link
                                                    onClick={setIsOpen}
                                                    to={`/show/${Notification}`}>Посмотреть</Link></button>
                                            <button className={"px-4 py-2 rounded bg-gray-600 text-white"}
                                                    onClick={setIsOpen}>Закрыть
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
};

export default NotificationNewMail;