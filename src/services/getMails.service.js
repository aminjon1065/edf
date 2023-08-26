import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_APP} from "../helpers/CONSTANTS";

export const messagesApi = createApi({
    reducerPath: "messagesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_APP,
        method: "post",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            headers.set('authorization', `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (build) => ({
        getMessages: build.query({
            query: ({page, searchQuery, startDate, endDate, order, column, request, type, isControl}) => {
                const params = {
                    page,
                    order,
                    column,
                    type,
                    isControl
                };
                if (searchQuery) {
                    params.query = searchQuery;
                }
                if (startDate && endDate) {
                    params.startDate = startDate;
                    params.endDate = endDate;
                }
                const queryString = Object.keys(params)
                    .map(key => `${key}=${params[key]}`)
                    .join('&');
                return `${request}?${queryString}`;
            },
        })
    })
});
export const {useGetMessagesQuery} = messagesApi;
