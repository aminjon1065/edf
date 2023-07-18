import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_APP } from '../../helpers/CONSTANTS';

const initialState = {
    isAuth: false,
    user: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        checkAuthSuccess(state, action) {
            state.isLoading = false;
            state.isAuth = true;
            state.error = null;
            state.user = action.payload.user;
        },
        checkAuthFailure(state, action) {
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.payload;
            state.user = action.payload.user;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            state.isAuth = true;
            state.error = null;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload?.token);
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.isLoading = false;
            state.error = null;
            state.user = null;
            localStorage.removeItem('token');
        },
    },
});

export const {loginStart, checkAuthSuccess,checkAuthFailure, loginSuccess, loginFailure, logout} = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await axios.post(`${API_APP}/login`, {
            email: email,
            password: password,
        });
        console.log('data :',response.data)
        dispatch(loginSuccess(response.data));
    } catch (error) {
        dispatch(loginFailure("Неправильный логин или пароль!"));
    }
};


export const checkAuth = (token) => async (dispatch) => {
    dispatch(loginStart())
    try {
        const response = await axios.get(`${API_APP}/checkAuth`,
            {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
        if (response.status === 401) {
            console.log("res401")
            dispatch(checkAuthFailure(response.message));
        }
        dispatch(checkAuthSuccess(response.data))
    } catch (e) {
        // localStorage.removeItem("token")
        dispatch(checkAuthFailure('Время токена закончено, авторизуйтесь заново!'));

    }
}

export default authSlice.reducer;
