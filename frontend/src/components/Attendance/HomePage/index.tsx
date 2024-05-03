import { jwtDecode } from "jwt-decode";
import React, { useEffect } from 'react';
import LoginPage from '../LoginPage';
import Navbar from "../Navbar";

export default function HomePage() {
    let hasToken = localStorage.getItem('accessToken');
    return (
        hasToken ? <Navbar/> : <LoginPage />
    );
}
