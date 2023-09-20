import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Index = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
    let borderColorClass;
    if (password && passwordConfirmation) {
        borderColorClass = password === passwordConfirmation ? 'border-green-300' : 'border-red-300';
    } else {
        borderColorClass = 'border-gray-300';
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangePasswordConfirmation = (e) => {
        setPasswordConfirmation(e.target.value);
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">{t("Interface.SideBar.CreateUser")}</h2>
                {/*<p className="mt-2 text-center text-sm text-gray-600">*/}
                {/*    Or{' '}*/}
                {/*    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                {/*        start your 14-day free trial*/}
                {/*    </a>*/}
                {/*</p>*/}
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-screen-md">
                <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
                    <form className="space-y-6" action="#" method="POST">
                        <div className={"flex flex-row justify-around space-x-4"}>
                            <div className={"w-full"}>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    {t("Interface.RegisterUser.FirstName")}
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        autoComplete="firstName"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className={"w-full"}>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    {t("Interface.RegisterUser.LastName")}
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        autoComplete="lastName"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                {t("Interface.Auth.Login.Email")}
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className={"flex flex-row justify-around space-x-4"}>
                            <div className={"w-full"}>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    {t("Interface.RegisterUser.Password")}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={onChangePassword}
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className={`appearance-none block w-full px-3 py-2 border ${borderColorClass} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                    />
                                </div>
                            </div>
                            <div className={"w-full"}>
                                <label htmlFor="passwordConfirmation"
                                       className="block text-sm font-medium text-gray-700">
                                    {t("Interface.RegisterUser.ConfirmPassword")}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={onChangePasswordConfirmation}
                                        id="passwordConfirmation"
                                        name="passwordConfirmation"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className={`appearance-none block w-full px-3 py-2 border ${borderColorClass} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                    />
                                </div>
                            </div>
                            <div className={"items-center mt-8"}>
                                <span
                                    id={"showPassword"}
                                    className="flex  items-center pr-3 cursor-pointer justify-center"
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
                        <div className={"flex flex-row justify-around space-x-4"}>
                            <div className="w-full">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    {t("Interface.RegisterUser.Role")}
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="role"
                                        name="role"
                                        autoComplete="role"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value="user">{t("Interface.RegisterUser.User")}</option>
                                        <option value="admin">{t("Interface.RegisterUser.Admin")}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                    {t("Interface.RegisterUser.Region")}
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="region"
                                        name="region"
                                        autoComplete="region"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option value="user">{t("Interface.Regions.Dushanbe")}</option>
                                        <option value="admin">{t("Interface.Regions.Sughd")}</option>
                                        <option value="admin">{t("Interface.Regions.Khatlon")}</option>
                                        <option value="admin">{t("Interface.Regions.GBAO")}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                    {t("Interface.RegisterUser.Department")}
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="region"
                                        name="region"
                                        autoComplete="region"
                                        required
                                        className="appearance-none block w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        {/*из базы при получении value добавить их в useTranslator в функцию t()*/}
                                        <option value={"Interface.Departments.Apparat"}>{t("Interface.Departments.Apparat")}</option>
                                        <option value={"Interface.Departments.CivilDefense"}>{t("Interface.Departments.CivilDefense")}</option>
                                        <option value={"Interface.Departments.ProtectionPopulation"}>{t("Interface.Departments.ProtectionPopulation")}</option>
                                        <option value={"Interface.Departments.TroopsDirectorate"}>{t("Interface.Departments.TroopsDirectorate")}</option>
                                        <option value={"Interface.Departments.BuildingsStructures"}>{t("Interface.Departments.BuildingsStructures")}</option>
                                        <option value={"Interface.Departments.HR"}>{t("Interface.Departments.HR")}</option>
                                        <option value={"Interface.Departments.InternationalCooperation"}>{t("Interface.Departments.InternationalCooperation")}</option>
                                        <option value={"Interface.Departments.Finance"}>{t("Interface.Departments.Finance")}</option>
                                        <option value={"Interface.Departments.Medical"}>{t("Interface.Departments.Medical")}</option>
                                        <option value={"Interface.Departments.CMC"}>{t("Interface.Departments.CMC")}</option>
                                        <option value={"Interface.Departments.Legal"}>{t("Interface.Departments.Legal")}</option>
                                        <option value={"Interface.Departments.Media"}>{t("Interface.Departments.Media")}</option>
                                        <option value={"Interface.Departments.Rescue"}>{t("Interface.Departments.Rescue")}</option>
                                        <option value={"Interface.Departments.Rear"}>{t("Interface.Departments.Rear")}</option>
                                        <option value={"Interface.Departments.Sarez"}>{t("Interface.Departments.Sarez")}</option>
                                        <option value={"Interface.Departments.Town"}>{t("Interface.Departments.Town")}</option>
                                        <option value={"Interface.Departments.EducationCenter"}>{t("Interface.Departments.EducationCenter")}</option>
                                        <option value={"Interface.Departments.Laboratory"}>{t("Interface.Departments.Laboratory")}</option>
                                        <option value={"Interface.Departments.MilHospital"}>{t("Interface.Departments.MilHospital")}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-row justify-around space-x-4"}>
                            <div className={"w-full"}>
                                <button
                                    onClick={() => navigate(-1)}
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <XMarkIcon className={"w-5 h-5 mr-1"}  />
                                    {t("Interface.RegisterUser.Cancel")}
                                </button>
                            </div>
                            <div className={"w-full"}>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <CheckIcon className={"w-5 h-5 mr-1"} />
                                    {t("Interface.RegisterUser.Submit")}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Index;