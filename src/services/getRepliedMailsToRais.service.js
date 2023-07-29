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
            query: () => 'get-replied-to-rais',
        }),
    }),
});

export const {useGetRepliedToRaisQuery} = getRepliedApi;
