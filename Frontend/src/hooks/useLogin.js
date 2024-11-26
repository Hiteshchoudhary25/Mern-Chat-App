import React, { useState } from 'react'
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} =  useAuthContext();

  const login = async (userName , password) => {
    const success = handleInputError({ userName, password});
    if(!success) return;

    setLoading(true); // Set the loading state to true when the user is attempting to authenticate
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userName, password})
        });
        const data = await res.json();
        console.log(data); // Log the user data if authentication is successful
        toast.success("Logged in successfully!") // Display a success toast message if authentication is successful
        if(data.error){
            throw new Error(data.error); // Throw an error if authentication fails
        }
        localStorage.setItem("chat-user" , JSON.stringify(data));
        setAuthUser(data); // Set the authenticated user in the AuthContext

    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false);  // Reset the loading state after the authentication process
    }
  }
  return { login, loading };  // Export the login function and the loading state as a return value
}

export default useLogin


function handleInputError({fullName, userName, password,confirmPassword, gender}){
    if(!userName || !password ){
        toast.error("Please enter all the required fields !");
        return false;
    }
    
    return true;
}