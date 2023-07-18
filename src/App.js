import React from "react";
import './App.css';
import Login from "./pages/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkAuth} from "./state/slices/signIn";
import {BrowserRouter} from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Loader from "./components/UI/Loader";


function App() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const selector = useSelector(state => state.auth);
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth(token))
        }
    }, [dispatch]);
    return (
        <React.Fragment>
            {
                selector.isLoading
                    ?
                    <div className={"h-screen flex justify-center items-center"}>
                        <Loader/>
                    </div>
                    :
                    <BrowserRouter>
                        {
                            isAuth
                                ?
                                <ProtectedRoutes/>
                                :
                                <Login/>
                        }
                    </BrowserRouter>
            }
        </React.Fragment>
    );
}

export default App;
