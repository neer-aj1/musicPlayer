import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signOutUser } from '../redux/slices/userSlice';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { addSongs } from '../redux/slices/songsSlice';


const Sidenavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    const handleUserLogout = async () => {
        try {
            const res = await fetch('api/auth/signout');
            const data = await res.json();
            console.log(data);
            dispatch(signOutUser());
            dispatch(addSongs([]))

        } catch (error) {
            console.log("Something Wrong Happened!!", error);
        }
    }
    return (
        <div className='flex md:flex md:justify-between md:max-h-screen bg-gray-900'>
            <div className='hidden md:flex flex-2 min-w-96 flex-col gap-4 max-h-screen bg-gray-950 p-2 text-white border-4 border-gray-950'>
                <div className='bg-gray-800 text-xl text-white rounded-xl p-3'>
                    <nav className='flex flex-col gap-5'>
                        <div className='flex gap-3 items-center hover:bg-gray-950 p-2 rounded-lg'>
                            <IoHomeOutline className='text-2xl' />
                            <Link to='/' className='text-xl'>Home</Link>
                        </div>
                        <div className='flex gap-3 items-center hover:bg-gray-950 p-2 rounded-lg'>
                            <IoIosSearch className='text-2xl' />
                            <Link to='/search' className='text-xl'>Search</Link>
                        </div>
                    </nav>
                </div>
                <div className='flex flex-col bg-gray-800 flex-grow overflow-y-auto rounded-xl pl-4'>
                    {user.currentUser ? "Enjoy Your songs" :
                        <div>
                            <h2 className='sticky top-0 bg-gray-800 py-8 text-xl font-bold'>Your Favourite Songs</h2>
                            <div className='flex flex-col gap-6 justify-center items-center overflow-y-auto'>
                                <div className='border rounded-md mt-1'>
                                    <button className='p-2 w-52 rounded-md shadow-md hover:bg-white hover:text-black duration-500 hover:-translate-x-1 hover:-translate-y-1'>
                                        <Link to='/sign-in'>Login</Link>
                                    </button><br />
                                </div>
                                <div className='border rounded-md'>
                                    <button className='rounded-md p-2 w-52  shadow-md hover:bg-white hover:text-black duration-500 hover:-translate-x-1 hover:-translate-y-1'>
                                        <Link to='/sign-up'>Signup</Link>
                                    </button>
                                </div>
                            </div>
                        </div>}
                </div>
            </div>
            <div className="md:hidden z-10 flex items-center fixed top-5 right-2">
                <button className="text-white focus:outline-none" onClick={toggleNavbar}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className='flex absolute max-w-[400px] h-screen min-w-96 flex-col gap-4 bg-gray-950 p-2 text-white border-4 border-gray-950'>
                    <div className='bg-gray-800 text-xl text-white rounded-xl p-3'>
                        <nav className='flex flex-col gap-5'>
                            <div className='flex gap-3 items-center hover:bg-gray-950 p-2 rounded-lg'>
                                <IoHomeOutline className='text-2xl' />
                                <Link to='/' className='text-xl'>Home</Link>
                            </div>
                            <div className='flex gap-3 items-center hover:bg-gray-950 p-2 rounded-lg'>
                                <IoIosSearch className='text-2xl' />
                                <Link to='/search' className='text-xl'>Search</Link>
                            </div>
                        </nav>
                    </div>
                    <div className='flex flex-col bg-gray-800 flex-grow overflow-y-auto rounded-xl pl-4'>
                        {user.currentUser ? "ENJOY YOUR SONGS" :
                            <div>
                                <h2 className='sticky top-0 bg-gray-800 py-8 text-xl font-bold'>Your Favourite Songs</h2>
                                <div className='flex flex-col gap-6 justify-center items-center overflow-y-auto'>
                                    <div className='border rounded-md mt-1'>
                                        <button className='p-2 w-52 rounded-md shadow-md hover:bg-white hover:text-black duration-500 hover:-translate-x-1 hover:-translate-y-1'>
                                            <Link to='/sign-in'>Login</Link>
                                        </button><br />
                                    </div>
                                    <div className='border rounded-md'>
                                        <button className='rounded-md p-2 w-52  shadow-md hover:bg-white hover:text-black duration-500 hover:-translate-x-1 hover:-translate-y-1'>
                                            <Link to='/sign-up'>Signup</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>}
                    </div>
                    {user.currentUser ? <div className='text-white flex justify-center items-center'>
                        <button onClick={handleUserLogout} className='p-2 border mt-4 rounded-xl hover:text-gray-800 hover:bg-white duration-300'>Logout</button>
                    </div> : ""}

                </div>
            )}
        </div>
    )
}

export default Sidenavbar;