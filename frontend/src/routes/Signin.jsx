import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signInUser } from '../redux/slices/userSlice';

const Signin = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSigninFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { email, password };
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const response = await res.json();
            if(response.success == false){
                alert("WENT WRONG!!");
                return;
            }
            dispatch(signInUser(response))
            navigate('/')

        } catch (error) {
            console.log("Error occured while login!");
        }
    }

    return (
        <div className='bg-black fixed inset-0 h-screen w-screen bg-opacity-80 backdrop-blur-sm text-white flex justify-center items-center'>
            <button
                className='absolute top-10 right-10 text-4xl'
                onClick={() => (navigate('/'))}
            ><RxCross2 /></button>
            <form
                className='flex flex-col gap-4 text-black bg-white opacity-100 p-10 w-96 rounded-xl'
                onSubmit={handleSigninFormSubmit}
            >
                <h1 className='font-bold text-4xl uppercase'>Sign-in</h1>
                <div className='flex flex-col'>
                    <label htmlFor="">Email or Username</label>
                    <input
                        className='border p-3 rounded-lg'
                        name='email'
                        placeholder='Enter email or username'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Password</label>
                    <input
                        className='border p-3 rounded-lg'
                        name='password'
                        placeholder='Enter password'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='border-2 border-gray-800 rounded-xl'>
                    <button
                        type='submit'
                        className='rounded-md p-2 w-full border border-gray-800 bg-gray-800 text-white shadow-md hover:bg-white hover:text-black duration-500 hover:-translate-x-1 hover:-translate-y-1'
                    >
                        Signup
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Signin