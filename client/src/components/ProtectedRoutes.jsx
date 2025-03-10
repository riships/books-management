import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';

function ProtectedRoutes() {
    if (!sessionStorage.getItem('authToken')) {
        return <Navigate to="/login" />
    }
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default ProtectedRoutes