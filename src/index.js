import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./state/store";
import Echo from "laravel-echo";
import {VITE_PUSHER_APP_CLUSTER, VITE_PUSHER_APP_KEY, VITE_PUSHER_HOST} from "./helpers/CONSTANTS";
import i18n from "./localization/i18n";

window.Pusher = require('pusher-js');
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: VITE_PUSHER_APP_KEY,
    cluster: VITE_PUSHER_APP_CLUSTER,
    wsHost: VITE_PUSHER_HOST,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
