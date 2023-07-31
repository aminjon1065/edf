import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_APP} from "../helpers/CONSTANTS";

export const getRepliedApi = createApi({
    reducerPath:'getRepliedApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_APP,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            headers.set('authorization', `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getRepliedToRais: builder.query({
            query: ({page, searchQuery, startDate, endDate, order, column}) => {
                let queryString = `get-replied-to-rais?page=${page}&query=&startDate=&endDate=&order=${order}&column=${column}`;
                if (searchQuery) {
                    queryString = `get-replied-to-rais?page&query=${searchQuery}&startDate=&endDate=&order=${order}&column=${column}`;
                }
                if (startDate && endDate) {
                    queryString = `get-replied-to-rais?page=${page}&query=&startDate=${startDate}&endDate=${endDate}&order=${order}&column=${column}`;
                }
                if (searchQuery && startDate && endDate) {
                    queryString = `get-replied-to-rais?page=${page}&query=${searchQuery}&startDate=${startDate}&endDate=${endDate}&order=${order}&column=${column}`;
                }
                return queryString;
            },
            // query: () => 'get-replied-to-rais',
        }),
    }),
});

export const {useGetRepliedToRaisQuery} = getRepliedApi;
