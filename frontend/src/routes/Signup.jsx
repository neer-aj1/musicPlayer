import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const handleSignupFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { image, email, password };
            const res = await fetch('/api/auth/signup', {
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
            navigate('/sign-in');
        } catch (error) {
            console.log("Error");
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
                onSubmit={handleSignupFormSubmit}
            >
                <h1 className='font-bold text-4xl uppercase'>Signup</h1>
                <div className='flex flex-col'>
                    <label htmlFor="">Username</label>
                    <input
                        className='border p-3 rounded-lg'
                        name='username'
                        placeholder='Enter username'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="">Email</label>
                    <input
                        className='border p-3 rounded-lg'
                        name='email'
                        placeholder='Enter email'
                        type="email"
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
                <div className='flex flex-col'>
                    <label htmlFor="">Confirm Password</label>
                    <input
                        className='border p-3 rounded-lg'
                        placeholder='Confirm Password'
                        name='confirmPass'
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
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

export default Signup