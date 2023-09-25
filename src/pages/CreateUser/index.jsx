import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import {ArrowLeftCircleIcon, CheckIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import Success from "../../components/Success";
import Loader from "../../components/UI/Loader";
import axios from "axios";
import {PUBLIC_URL_BACKEND} from "../../helpers/CONSTANTS";

const Index = () => {
    const {t} = useTranslation();
    usePageTitle(t("Interface.SideBar.CreateUser"));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState(0);
    const [region, setRegion] = useState("Interface.Regions.Dushanbe");
    const [department, setDepartment] = useState("Interface.Departments.Apparat");
    const [rank, setRank] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    let borderColorClass;
    if (password && passwordConfirmation) {
        borderColorClass = password === passwordConfirmation ? 'border-indigo-500 focus:ring-indigo-500 focus:border-indigo-500' : 'border-red-300 focus:ring-red-500 focus:border-red-500';
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
    const onChagePosition = (e) => {
        setPosition(e.target.value);
    }
    const onSubmit = () => {
        setIsLoading(true);
        axios.post(`${PUBLIC_URL_BACKEND}/api/v1/register`, {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirmation: passwordConfirmation,
            role,
            region,
            department,
            position,
            rank
        }).then((response) => {
            if (response.status === 201) {
                setIsLoading(false);
                setSuccess(true);
            }
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    }
    return (
        <>
            <span>
            </span>
            {
                isLoading
                    ?
                    <Loader/>
                    :
                    success
                        ?
                        <>
                            <Success/>
                            <div className={"w-2/4 mx-auto"}>
                                <button
                                    onClick={() => setSuccess(false)}
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <ArrowLeftCircleIcon className={"w-5 h-5 mr-1"}/>
                                    {t("Interface.Back")}
                                </button>
                            </div>
                        </>
                        :
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
                                                <label htmlFor="firstName"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {t("Interface.RegisterUser.FirstName")}
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={(e) => setFirstName(e.target.value)}
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
                                                <label htmlFor="lastName"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {t("Interface.RegisterUser.LastName")}
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={(e) => setLastName(e.target.value)}
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
                                                    onChange={(e) => setEmail(e.target.value)}
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
                                                <label htmlFor="password"
                                                       className="block text-sm font-medium text-gray-700">
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
                                                <label htmlFor="role"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {t("Interface.RegisterUser.Role")}
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        id="role"
                                                        name="role"
                                                        autoComplete="role"
                                                        required
                                                        disabled
                                                        onChange={(e) => setRole(e.target.value)}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <option value="user"
                                                                defaultValue={"user"}>{t("Interface.RegisterUser.User")}</option>
                                                        <option
                                                            value="admin">{t("Interface.RegisterUser.Admin")}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="region"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {t("Interface.RegisterUser.Region")}
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        id="region"
                                                        name="region"
                                                        autoComplete="region"
                                                        required
                                                        onChange={(e) => setRegion(e.target.value)}
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        <option value="Interface.Regions.Dushanbe"
                                                                defaultValue={"Interface.Regions.Dushanbe"}>{t("Interface.Regions.Dushanbe")}</option>
                                                        <option
                                                            value="Interface.Regions.Sughd">{t("Interface.Regions.Sughd")}</option>
                                                        <option
                                                            value="Interface.Regions.Khatlon">{t("Interface.Regions.Khatlon")}</option>
                                                        <option
                                                            value="Interface.Regions.GBAO">{t("Interface.Regions.GBAO")}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"flex flex-row justify-around space-x-4"}>
                                            <div className={"w-full"}>
                                                <label htmlFor="rank"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {t("Interface.RegisterUser.Rank")}
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        id="rank"
                                                        name="rank"
                                                        type="text"
                                                        onChange={(e) => setRank(e.target.value)}
                                                        autoComplete="rank"
                                                        required
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="position"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {t("Interface.RegisterUser.Position")}
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        onChange={onChagePosition}
                                                        id="position"
                                                        name="position"
                                                        type={"text"}
                                                        autoComplete="position"
                                                        required
                                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="department"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {t("Interface.RegisterUser.Department")}
                                                </label>
                                                <div className="mt-1">
                                                    <select
                                                        id="department"
                                                        name="department"
                                                        autoComplete="department"
                                                        onChange={(e) => setDepartment(e.target.value)}
                                                        required
                                                        className="appearance-none block w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                        {/*из базы при получении value добавить их в useTranslator в функцию t()*/}
                                                        <option
                                                            value={"Interface.Departments.Apparat"}
                                                            defaultValue={"Interface.Departments.Apparat"}>{t("Interface.Departments.Apparat")}</option>
                                                        <option
                                                            value={"Interface.Departments.CivilDefense"}>{t("Interface.Departments.CivilDefense")}</option>
                                                        <option
                                                            value={"Interface.Departments.ProtectionPopulation"}>{t("Interface.Departments.ProtectionPopulation")}</option>
                                                        <option
                                                            value={"Interface.Departments.TroopsDirectorate"}>{t("Interface.Departments.TroopsDirectorate")}</option>
                                                        <option
                                                            value={"Interface.Departments.BuildingsStructures"}>{t("Interface.Departments.BuildingsStructures")}</option>
                                                        <option
                                                            value={"Interface.Departments.HR"}>{t("Interface.Departments.HR")}</option>
                                                        <option
                                                            value={"Interface.Departments.InternationalCooperation"}>{t("Interface.Departments.InternationalCooperation")}</option>
                                                        <option
                                                            value={"Interface.Departments.Finance"}>{t("Interface.Departments.Finance")}</option>
                                                        <option
                                                            value={"Interface.Departments.Medical"}>{t("Interface.Departments.Medical")}</option>
                                                        <option
                                                            value={"Interface.Departments.CMC"}>{t("Interface.Departments.CMC")}</option>
                                                        <option
                                                            value={"Interface.Departments.Legal"}>{t("Interface.Departments.Legal")}</option>
                                                        <option
                                                            value={"Interface.Departments.Media"}>{t("Interface.Departments.Media")}</option>
                                                        <option
                                                            value={"Interface.Departments.Rescue"}>{t("Interface.Departments.Rescue")}</option>
                                                        <option
                                                            value={"Interface.Departments.Rear"}>{t("Interface.Departments.Rear")}</option>
                                                        <option
                                                            value={"Interface.Departments.Sarez"}>{t("Interface.Departments.Sarez")}</option>
                                                        <option
                                                            value={"Interface.Departments.Town"}>{t("Interface.Departments.Town")}</option>
                                                        <option
                                                            value={"Interface.Departments.EducationCenter"}>{t("Interface.Departments.EducationCenter")}</option>
                                                        <option
                                                            value={"Interface.Departments.Laboratory"}>{t("Interface.Departments.Laboratory")}</option>
                                                        <option
                                                            value={"Interface.Departments.MilHospital"}>{t("Interface.Departments.MilHospital")}</option>
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
                                                    <XMarkIcon className={"w-5 h-5 mr-1"}/>
                                                    {t("Interface.RegisterUser.Cancel")}
                                                </button>
                                            </div>
                                            <div className={"w-full"}>
                                                <button
                                                    onClick={onSubmit}
                                                    type="submit"
                                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <CheckIcon className={"w-5 h-5 mr-1"}/>
                                                    {t("Interface.RegisterUser.Submit")}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
            }
        </>
    );
};

export default Index;