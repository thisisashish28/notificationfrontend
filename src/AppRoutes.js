
import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/Login/LoginPage"
import RegisterPage from "./pages/Register/RegisterPage"
import ProfilePage from "./pages/Profile/ProfilePage"
import AuthRoute from "./components/AuthRoute/AuthRoute"
import HomePage from "./pages/HomePage/HomePage"


export default function AppRoutes(){
    return (
        
<Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<RegisterPage />}/>
    <Route path="/dashboard" element={<HomePage />}/>
    <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute> }/>
    
</Routes>
    )
}

// http://192.168.242.197:3000