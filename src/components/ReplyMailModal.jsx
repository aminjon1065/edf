import {Fragment, useCallback, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {EnvelopeIcon, DocumentIcon, XCircleIcon} from '@heroicons/react/24/outline'
import {useDropzone} from 'react-dropzone'
import api from "./../services/api";
import Editor from "./Editor";

export default function ReplyMailModal({open, setOpen, uuid, reload, setReload}) {
    // Локальные состояния
    const [htmlContent, setHtmlContent] = useState("");
    const [title, setTitle] = useState("")
    const [control, setControl] = useState(false)
    const cancelButtonRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [dateDone, setDateDone] = useState('');
    const [toRais, setToRais] = useState(false)


    // Получение контента редактора
    const getContent = (htmlContentProp) => {
        setHtmlContent(htmlContentProp);
    };

    // Функция обработки загрузки файлов
    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    // Функция удаления файла
    const removeFile = (fileIndex) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleChangeDateDone = (e) => {
        setDateDone(e.target.value)
    }
    const handleChangeImportance = (e) => {
        setControl(!control)
    }
    const handleChangeToRais = (e) => {
        setToRais(!toRais)
    }


    // Использование React Dropzone хука
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.docx', '.doc'],
            'application/vnd.ms-excel': ['.xls', '.xlsx'],
            'application/vnd.ms-powerpoint': ['.pptx'],
            'image/jpeg': ['.jpeg', '.png', '.jpg'],
        }
    });
    const sendMailFN = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', htmlContent);
        formData.append('date_done', dateDone);
        formData.append('toRais', toRais ? 1 : 0);
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files[]', files[i]);
            }
        }
        setOpen(false)
        api.post(`/reply/${uuid}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            setHtmlContent('');
            setTitle('')
            setControl(false)
            setFiles([])
            setDateDone("")
            setReload(!reload)
            // if (response.status === 201) {
            //     window.location.reload()
            // }
            console.log(response)
        }).catch((error) => {
            setHtmlContent('');
            setTitle('')
            setControl(false)
            setFiles([])
            setDateDone("")
            setReload(!reload)
        })
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:w-full md:max-w-4xl">
                                {
                                    <>
                                        <div className="bg-white  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start md:block">
                                                <div className="flex flex-row items-center">
                                                    <div
                                                        className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                                                        <EnvelopeIcon
                                                            className="h-6 w-6 text-sky-600"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-base font-semibold leading-6 text-gray-900 ml-2"
                                                    >
                                                        Ответ к письму <span className={"text-indigo-700"}>{uuid}</span>
                                                    </Dialog.Title>
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <div className="mt-2">
                                                        <form className="space-y-8 divide-y divide-gray-200">
                                                            <div className="space-y-8 divide-y divide-gray-200">
                                                                <div>
                                                                    <div
                                                                        className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                                                        <div className="sm:col-span-6">
                                                                            <label htmlFor="title"
                                                                                   className="block text-sm font-medium text-gray-700">
                                                                                Заголовок
                                                                                <sup
                                                                                    className={"text-red-500 font-bold"}>*</sup>
                                                                            </label>
                                                                            <div
                                                                                className="mt-1 rounded-md shadow-sm">
                                                                                <input
                                                                                    value={title}
                                                                                    onChange={handleChangeTitle}
                                                                                    type="text"
                                                                                    id={"title"}
                                                                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="sm:col-span-6">
                                                                            <label htmlFor="description"
                                                                                   className="block text-sm font-medium text-gray-700">
                                                                                Текст
                                                                            </label>
                                                                            <div
                                                                                className="">
                                                                                <Editor getContent={getContent}/>
                                                                            </div>
                                                                            {/*<div className="mt-1">*/}
                                                                            {/*    <textarea*/}
                                                                            {/*        id="description"*/}
                                                                            {/*        name="about"*/}
                                                                            {/*        rows={3}*/}
                                                                            {/*        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"*/}
                                                                            {/*        defaultValue={''}*/}
                                                                            {/*    />*/}
                                                                            {/*</div>*/}
                                                                            <p className="mt-2 text-sm text-gray-500">
                                                                                дополнение, тело документа,
                                                                                примечание и т.д.
                                                                            </p>
                                                                        </div>
                                                                        <div className="sm:col-span-6">
                                                                            <label htmlFor="cover-photo"
                                                                                   className="block text-sm font-medium text-gray-700">
                                                                                Загрузка документов
                                                                            </label>
                                                                            <div
                                                                                {...getRootProps()}
                                                                                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${isDragActive ? 'bg-indigo-200' : ''}`}>
                                                                                <div
                                                                                    className="space-y-1 text-center">
                                                                                    <input
                                                                                        type="file" {...getInputProps()}
                                                                                        className={"sr-only"}/>
                                                                                    <svg
                                                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                                                        stroke="currentColor"
                                                                                        fill="none"
                                                                                        viewBox="0 0 48 48"
                                                                                        aria-hidden="true"
                                                                                    >
                                                                                        <path
                                                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                                            strokeWidth={2}
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                        />
                                                                                    </svg>
                                                                                    <div
                                                                                        className="flex text-sm text-gray-600">
                                                                                <span
                                                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                                                >
                                                                                    Загрузить документ
                                                                                </span>
                                                                                        <p className="pl-1">или
                                                                                            можете перетащит
                                                                                            документ</p>
                                                                                    </div>
                                                                                    <p className="text-xs text-gray-500">DOCX,
                                                                                        PDF, XLS
                                                                                        JPG</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {files.length > 0 ? (
                                                                                <div className={"sm:col-span-6"}>
                                                                                    <h4>Загруженные файлы:</h4>
                                                                                    <div
                                                                                        className=" grid grid-cols-4 gap-4">
                                                                                        {files.map((file, index) => (
                                                                                            <div key={file.name}>
                                                                                                <div
                                                                                                    className={"relative"}>
                                                                                                    <button
                                                                                                        className={"absolute -top-3 text-red-700  -right-2 hover:text-white hover:bg-red-700 rounded-full"}
                                                                                                        onClick={() => removeFile(index)}>
                                                                                                        <XCircleIcon
                                                                                                            className={"h-6 w-6"}/>
                                                                                                    </button>
                                                                                                    {file.type.startsWith('image/') ? (
                                                                                                        <img
                                                                                                            className={"w-48 h-36 rounded-lg"}
                                                                                                            src={URL.createObjectURL(file)}
                                                                                                            alt={file.name}/>
                                                                                                    ) : (
                                                                                                        <DocumentIcon
                                                                                                            className={"w-48 h-36"}/>
                                                                                                    )}
                                                                                                    <p className={"truncate"}>{file.name}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            ) :
                                                                            null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                disabled={!title}
                                                type="button"
                                                className="disabled:bg-gray-300 inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                                                onClick={sendMailFN}
                                            >
                                                Отправить
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpen(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    </>
                                }
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
