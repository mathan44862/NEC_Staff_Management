import { jwtDecode } from "jwt-decode";
import React from 'react';
import Header from './Header';
import LoginPage from '../LoginPage';
import MyRoutes from "../../routes/MyRoutes";
import Navbar from "../Navbar";

export default function HomePage() {
    let hasToken = localStorage.getItem('accessToken');
    let user = hasToken ? jwtDecode(hasToken) : { role: '' };
    return (
        hasToken ? <Navbar/> : <LoginPage />
    );
}
