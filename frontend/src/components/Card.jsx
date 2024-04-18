import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ coverArt, name, year, uri }) => {
    uri= uri.split(":")[2];
    
    return (
        <div className="w-[200px] h-fit border rounded-lg shadow bg-gray-800 border-gray-700">
            <Link>
                <img className="rounded-t-lg w-full" src={coverArt} alt="cover art" />
            </Link>
            <div className="p-5">
                <Link >
                    <h5 className="mb-2 truncate text-md font-bold tracking-tight dark:text-gray-900 text-white">{name}</h5>
                </Link>
                <p className="mb-3 font-normal dark:text-gray-700 text-gray-400">{year}</p>
                <Link
                    to={`/album/${uri}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Explore
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            </div>
        </div>

    )
}

export default Card