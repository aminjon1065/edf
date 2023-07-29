import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/signIn';
import {messagesApi} from "../services/getMails.service";
import {inboxApiById} from "../services/show.mail.service";
import notificationSlice from './slices/notification';
import {getRepliedApi} from "../services/getRepliedMailsToRais.service";
import {repliedByIdApi} from "../services/show.replied.service";

const rootReducer = combineReducers({
    auth: authReducer,
    // [inboxAPIService.reducerPath]:inboxAPIService.reducer
    [messagesApi.reducerPath]: messagesApi.reducer,
    [inboxApiById.reducerPath]: inboxApiById.reducer,
    [getRepliedApi.reducerPath]: getRepliedApi.reducer,
    [repliedByIdApi.reducerPath]: repliedByIdApi.reducer,
    notificationModal: notificationSlice,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([messagesApi.middleware, inboxApiById.middleware, getRepliedApi.middleware, repliedByIdApi.middleware]),
});

export default store;
