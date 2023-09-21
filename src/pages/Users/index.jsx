import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import logo from './../../assets/images/logo.png'
import {useTranslation} from "react-i18next";
import Loader from "../../components/UI/Loader";

const Index = () => {
    const {t} = useTranslation();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        api.get('/get-all-users').then(response => {
            setUsers(response.data.data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
            setIsLoading(false);
        });
    }, []);
    console.log(users)
    return (
        isLoading
            ?
            <Loader/>
            :
            users.length ? (
                <div>
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Name
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Title
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Role
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {users.map((person) => (
                            <tr key={person.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={logo} alt=""/>
                                        </div>
                                        <div className="ml-4">
                                            <div className="font-medium text-gray-900">{person.full_name}</div>
                                            <div className="text-gray-500">{person.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">{person.region}</div>
                                    <div className="text-gray-500">{person.department}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                            className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role === 1 ? t("Interface.Admin") : person.role === 0 ? t("Interface.User") : person.role === 99 ? t("Interface.Management") : null}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="/" className="text-indigo-600 hover:text-indigo-900">
                                        Edit<span className="sr-only">, {person.full_name}</span>
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : <span>Empty</span>
    );
}
export default Index;