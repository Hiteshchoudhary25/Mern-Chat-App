import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const LogIn = () => {
    const [userName , setUserName] =  useState("");
    const [password , setPassword] =  useState("");

    const {loading , login} = useLogin();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(userName, password)
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'>Login <span className='text-blue-500'>ChatAPP</span></h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label className='label p-2'><span className='text-base label-text'>Username</span></label>
                    <input type='text'placeholder='Enter Username ' className='w-full input input-bordered h-10' 
                    value={userName} onChange={(e) => setUserName(e.target.value)} />                                        
                </div>
                <div>
                    <label className='label' ><span className='text-base label-text'> Password</span></label>
                    <input type='password' placeholder='Enter Password' className='w-full input input-bordered h-10' 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <Link to={"/signup"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block '>{"Don't"} have a account?</Link>
                <button className='w-full text-white font-semibold py-2 px-6 rounded-lg mt-4 bg-blue-500 hover:bg-blue-600 disabled:{loading}'>
                    {loading ? <span className='loading loading-dots'></span> : "Login"}
                </button>
            </form>
        </div>
    </div>
  )
}

export default LogIn