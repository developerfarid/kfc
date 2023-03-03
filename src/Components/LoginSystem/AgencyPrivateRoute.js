import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


export default function AgencyPrivateRoute() {
    const userFromLocalStorage = JSON.parse(localStorage?.getItem("userId"))
    let location = useLocation();
    return userFromLocalStorage ? <Outlet /> : <Navigate to="/AgencyLanding" state={{ from: location }} />
}