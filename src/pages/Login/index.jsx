import React, {useState, Fragment} from 'react';
import AuthCard from "../../components/UI/AuthCard";
import ApplicationLogo from "../../components/UI/ApplicationLogo";
import Input from "../../components/UI/Input";
import Label from "../../components/UI/Label";
import {useDispatch, useSelector} from "react-redux";
import usePageTitle from "../../hooks/usePageTitle";
import {login} from "../../state/slices/signIn";
import {LockClosedIcon, EyeIcon, EyeSlashIcon, ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import {Popover, Transition} from '@headlessui/react';

const Index = () => {
    usePageTitle("Войти");
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const changeEmail = (event) => {
        setEmail(event.target.value);
    };

    const changePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <AuthCard
            logo={
                // <Link to={"/"}>
                <ApplicationLogo
                    className="mx-auto h-28 w-auto"
                    // className="w-20 h-20 fill-current text-gray-500"
                />
                // </Link>
            }
        >


            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Вход в ваш аккаунт
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="block mt-1 w-full"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />

                            {/*<InputError messages={messages} className="mt-2"/>*/}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Пароль
                                </label>
                                <div className="text-sm">
                                    <Popover className="relative">
                                        {({open}) => (
                                            <>
                                                <Popover.Button
                                                    className={`
                                                            ${open ? '' : 'text-opacity-90'}
                                                            font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-0
                                                        `}
                                                >
                                                    <div className="flex">
                                                        <span>Забыли пароль?</span>
                                                        {open ? (
                                                            <ChevronUpIcon
                                                                className={`${open ? '' : 'text-opacity-70'}
                                                                        ml-2 h-5 w-5 text-indigo-600 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <ChevronDownIcon
                                                                className={`${open ? '' : 'text-opacity-70'}
                                                                        ml-2 h-5 w-5 text-indigo-600 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                    </div>
                                                </Popover.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0 translate-y-1"
                                                    enterTo="opacity-100 translate-y-0"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100 translate-y-0"
                                                    leaveTo="opacity-0 translate-y-1"
                                                >
                                                    <Popover.Panel
                                                        className="absolute lg:left-0.5/2 lg:w-screen  z-10 mt-3 max-w-xs -translate-x-1/2"
                                                    >
                                                        <div
                                                            className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                            <div className="relative  bg-white p-3">
                                                                    <span>
                                                                        Если вы забыли свой пароль, пожалуйста, обращайтесь в
                                                                        <span className="text-green-500 font-bold">
                                                                            "Общий отдел"
                                                                        </span>
                                                                    </span>
                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="relative block">
                                    <input
                                        value={password}
                                        onChange={changePassword}
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                                    />
                                    <span
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                            {showPassword ? (
                                                <EyeIcon className="h-5 w-5 fill-black"/>
                                            ) : (
                                                <EyeSlashIcon className="h-5 w-5 fill-black"/>
                                            )}
                                        </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                        aria-hidden="true"/>
                                    </span>
                                Вход
                            </button>
                        </div>
                    </form>
                </div>
                {auth.error && (
                    <div className="max-w-4xl mx-auto mt-5">
                        <div className="px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
                            <p className="font-bold">{auth.error}</p>
                        </div>
                    </div>
                )}
            </div>
        </AuthCard>
    );
};

export default Index;