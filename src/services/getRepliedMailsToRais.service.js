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
            query: ({page, searchQuery, startDate, endDate, order, column, isControl}) => {
const params = {
                    page,
                    order,
                    column,
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
                return `get-replied-to-rais?${queryString}`;
            },
            // query: () => 'get-replied-to-rais',
        }),
    }),
});

export const {useGetRepliedToRaisQuery} = getRepliedApi;
