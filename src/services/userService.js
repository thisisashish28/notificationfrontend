import axios from 'axios';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// export const getUser = () => 
//     localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

export const getCurrentUser = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if(!token){
        console.log("error");
    }
    try {
      // const {data} = await axios.get('http://localhost:8000/api/profile', {
        //     headers: { 
        //         'Content-Type': 'application/json', 
        //         'Authorization': `Bearer ${token}` 
        //     }
        // });
        const {data} = await axios.get('http://192.168.128.197:8080/api/profile', {
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            }
        });
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('id', JSON.stringify(data.id) );
        console.log(JSON.parse(localStorage.getItem('id')));
        return data;
    } catch (error) {
        console.error('getCurrrent User error:', error);
    }
}

export const login = async (email,password) => {
  //const { data } = await axios.post('http://localhost:8000/api/login', { email, password});
  const { data } = await axios.post("http://192.168.128.197:8080/api/login", {email,password});
   console.log(data)
    localStorage.setItem('token',JSON.stringify(data.data.token));
    getCurrentUser();
    return data;
};

export const register = async (registerData) =>{
  
//    const { data } = await axios.post('http://localhost:8000/api/register', registerData);
const {data} = await axios.post('http://192.168.128.197:8080/api/register',registerData);
    localStorage.setItem('token',JSON.stringify(data.data.token));
    getCurrentUser();
    return data;
};


export const logout = async  () =>{
    const token = JSON.parse(localStorage.getItem('token')); 
    if(!token){
        console.log("error");
    }
    try {
        // await axios.post('http://localhost:8000/api/logout', {}, {
        //     headers: { 
        //         'Content-Type': 'application/json', 
        //         'Authorization': `Bearer ${token}` 
        //     }
        // });
          await axios.post('http://192.168.128.197:8080/api/logout', {}, {
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            }
        });

        console.log('user logout succesfully');

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout Error:', error);
    }
   
};



export const updateProfile = async user => {
    const {data} = await axios.put('http://localhost:5000/updateProfile', user);

    localStorage.setItem('user', JSON.stringify(data));
    return data;
}
export const changePassword = async passwords =>{
    await axios.put('http://localhost:5000/changePassword', passwords);
};


// export const getNotifications = async () => {
//     const { data } = await axios.get('http://localhost:8000/api/getNotification',{
//         headers:{
//             "Content-Type": 'application/json'
//         }
//     });
//     return data;
// }


export const changeTheStatus = async (id) => {
     //JSON.parse(localStorage.getItem('id')); // Parse id from localStorage
    console.log(id);
    try {
        // Make the POST request with correct syntax
        await axios.post("http://192.168.128.197:8080/api/updateNotification", { id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        // Log any errors that occur during the request
        console.error('Error in UserService changeTheStatus:', error);
    }
}