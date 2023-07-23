import React, {Fragment, useRef, useEffect, useState} from 'react';
import {Transition, Dialog} from '@headlessui/react';

const FileModal = ({isOpen, onClose, fileUrl, extension}) => {
    const cancelButtonRef = useRef(null);
    const [modalDimensions, setModalDimensions] = useState({width: '90%', height: '90%'});
    useEffect(() => {
        function updateModalDimensions() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const width = screenWidth * 0.9;
            const height = screenHeight * 0.9;
            setModalDimensions({width: `${width}px`, height: `${height}px`});
        }
        updateModalDimensions();
        window.addEventListener('resize', updateModalDimensions);
        return () => {
            window.removeEventListener('resize', updateModalDimensions);
        };
    }, []);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={onClose}
            >
                <div className="flex min-h-screen items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
                            style={{width: modalDimensions.width, height: modalDimensions.height}}
                        >
                            <>
                                <div className="p-5 flex flex-col justify-center items-center w-full h-full">
                                    <div className="w-full h-full text-center">
                                        <iframe src={fileUrl} title="File Viewer" className="w-full h-full"></iframe>
                                    </div>
                                    <button
                                        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                                        onClick={onClose}
                                    >
                                        Закрыть
                                    </button>
                                </div>
                            </>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default FileModal;
