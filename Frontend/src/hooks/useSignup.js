import React, { useState } from 'react'

import { toast } from'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading , setLoading]  = useState(false);
  const {setAuthUser} =  useAuthContext();

  const signup = async ({fullName , userName  , password , confirmPassword , gender}) =>{
    const success = handleInputError({fullName, userName, password, confirmPassword, gender});
    if(!success) return;

    setLoading(true);//set the loading state to true when the user is authenticated and the user is authenticated successfully
    try {
        const res = await fetch("/api/auth/signup",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName, userName, password,confirmPassword, gender})
        });
        if(!res.ok){
            throw new Error("Failed to signup, please try again later.");
        }
        const data = await res.json();
        toast.success("Signup Successful !");

        if(data.error){
            throw new Error(data.error);
        }
        //localstorage
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
        //redirect to home page or dashboard
        // window.location.href = "/home";
        console.log(data);
    } catch (error) {
        toast.error(error.message);
    }finally {
        setLoading(false); 
    }
  };
  return { signup , loading };
}

export default useSignup;

function handleInputError({fullName, userName, password,confirmPassword, gender}){
    if(!fullName || !userName || !password || !confirmPassword || !gender ){
        toast.error("Please enter all the required fields !");
        return false;
    }
    if(password.length < 6){
        toast.error("Password must be at least 6 characters long !");
        return false;
    }
    if(password !== confirmPassword){
        toast.error("Passwords don't match !");
        return false;
    }
    return true;
}