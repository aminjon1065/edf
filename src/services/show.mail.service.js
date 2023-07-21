import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_APP} from "../helpers/CONSTANTS";

// Создаем экземпляр API
export const inboxApiById = createApi({
    reducerPath: 'inboxApiById',
    baseQuery: fetchBaseQuery({
        baseUrl: API_APP,
        method:"post",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            headers.set('authorization', `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        getInboxById: builder.query({
            query: (id) => `inbox/${id}`, // Определяем конечную точку для получения inbox по ID
        }),
    }),
});

// Экспортируем хук использования запроса
export const {useGetInboxByIdQuery} = inboxApiById;