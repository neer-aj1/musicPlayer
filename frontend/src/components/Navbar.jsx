// Navbar.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { signOutUser } from '../redux/slices/userSlice';

const Navbar = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleUserLogout = async () => {
        try {
            const res = await fetch('api/auth/signout');
            const data = await res.json();
            console.log(data);
            dispatch(signOutUser());
        } catch (error) {
            console.log("Something Wrong Happened!!");
        }
    }

    return (
        user.currentUser ? (
            <div className="hidden md:block bg-gray-800 h-15 w-15 fixed top-2 right-5 p-2 rounded-xl">
                <div className="flex justify-end items-center">
                    <img
                        className='relative top-0 right-0 w-10 object-cover rounded-full'
                        onClick={toggleNavbar}
                        src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                        alt="profile image"
                    />
                </div>
                {isOpen && <div className='text-white'>
                    <button onClick={handleUserLogout} className='p-2 border mt-4 rounded-xl hover:text-gray-800 hover:bg-white duration-300'>Logout</button>
                </div>
                }
            </div>) : ("")
    );
};

export default Navbar;
