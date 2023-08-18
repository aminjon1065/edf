import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_APP} from "../helpers/CONSTANTS";

export const reportApi = createApi({
    reducerPath: "reportApi",
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
        getReports: build.query({
            query: ({field, start, end,}) => {
                return `reports?field=${field}&start=${start}&end=${end}`;
            },
        })
    })
});
export const {useGetReportsQuery} = reportApi