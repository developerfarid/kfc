import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import DashboardPage from '../Dashboard/DashboardPage/DashboardPage';

export default function PrivateRoute() {
    const userFromLocalStorage = JSON.parse(localStorage?.getItem("dToken"))
    let location = useLocation();
    return userFromLocalStorage?.displayName ? <Outlet /> : <Navigate to="/Login" state={{ from: location }} />
}