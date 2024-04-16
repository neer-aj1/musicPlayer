import React from 'react'
import { Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Sidenavbar = () => {
    return (
        <div className='flex flex-2 min-w-96 flex-col gap-4 max-h-screen bg-gray-950 p-2 text-white border-4 border-gray-950'>
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
            </div>
        </div>
    )
}

export default Sidenavbar;