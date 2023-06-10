import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLogin } from '../api/adminService';
import { TOAST_PROP } from '../App';

const Context = createContext();

export const CustomContext = () => useContext(Context);

export default function AuthContext({ children }) {

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        onPageRefresh()
    }, [])

    function onPageRefresh() {
        if (!sessionStorage.getItem("user")) {
            setIsAuthenticated(false)
            setUser(null)
        } else {

            setIsAuthenticated(true)
            setUser(JSON.parse(sessionStorage.getItem("user")))
            navigate(pathname)
        }
    }

    function login(userData) {
        toast.promise(userLogin(userData), {
            pending: "Logging in...",
            success: "Logged in successfully!!"
        }, TOAST_PROP).then(res => {
            console.log(res.data);
            navigate("/")
            sessionStorage.setItem("user", JSON.stringify(res.data))
            setIsAuthenticated(true)
            setUser(JSON.parse(sessionStorage.getItem("user")))
            return true;
        }).catch(err => {
            console.log(err);
            toast.error(err?.response?.data ? err?.response?.data : "Failed to login", TOAST_PROP)
        })

    }

    function logout() {
        sessionStorage.clear()
        setIsAuthenticated(false)
        setUser(null)
        toast.success("Logged Out Successfully!!", TOAST_PROP)
        navigate("/")
    }

    return (
        <Context.Provider value={{ isAuthenticated, user, login, logout}}>
            {children}
        </Context.Provider>
    )
}
