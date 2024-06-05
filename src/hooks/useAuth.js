import { useState, createContext, useContext, useEffect } from 'react';

import * as userService from '../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  
    const navigate = useNavigate();
   
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await userService.getCurrentUser();
          //  console.log(userData);
            setUser(userData);
        };
        fetchUser();
    }, [setUser]);
    

    const login = async (email,password) =>{
        try{
            const user = await userService.login(email,password);
            setUser(user);
           
            toast.success('Login Succesful');
        }
         catch(err) {
        //    toast.error(err.response.data);
         }
    };
    const register = async data => {
        try {
            const user = await userService.register(data);
            setUser(user);
           
            toast.success('Register Successful');
        } catch (err){
            toast.error(err.response.data);
        }
    };

    const logout = () => {
        userService.logout();
        setUser(null);
       
        navigate('/');
         toast.success('Logout Succesful');
    };



    const updateProfile = async user => {
        const updatedUser = await userService.updateProfile(user);
        // toast.success("Profile Update Was Successful");
        if(updatedUser) setUser(updatedUser);
    };
    const changePassword = async passwords =>{
        await userService.changePassword(passwords);
        logout();
        // toast.success("Password Chnaged Successfully, Please login again");
    };
    
    
    // const getNotifications = async ()=> {
    //     const {data} = await userService.getNotifications();
    //     // console.log(data[0].notificationHeader);
    //     return data;
    // }

    const updateNotification = async (id)=> {
        try{
            if(!user){
                return;
            }
        userService.changeTheStatus(id);
        }
        catch (err){
            console.error("error in the updateNotification inm useAuth:", err);
        }
    }

    // const getNotificationfromSocket = () => {
    //     try {
    //         const {data} = userService.getNotificationsfromSocket();
    //         return data; 
    //     }
    //     catch(err){
    //         console.err("Error is in getNotificationsfromSocket in authjs:", err);
    //     }
    // }

   

    return (
        <AuthContext.Provider value = {{user, login, logout, register, updateProfile, changePassword, updateNotification}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
