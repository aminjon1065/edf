import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_APP} from "../helpers/CONSTANTS";

// Создаем экземпляр API
export const repliedByIdApi = createApi({
    reducerPath: 'repliedByIdApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_APP,
        method: "get",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            headers.set('authorization', `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getRepliedById: builder.query({
            query: (id) => `get-replied-to-rais/${id}`, // Определяем конечную точку для получения inbox по ID
        }),
    }),
});

// Экспортируем хук использования запроса
export const {useGetRepliedByIdQuery} = repliedByIdApi;