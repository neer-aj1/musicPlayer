import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='h-screen w-screen fixed top-0 flex flex-col justify-center items-center left-0 bg-white backdrop-blur-md bg-opacity-15'>
            <InfinitySpin
                visible={true}
                width="200"
                color="#fff"
                ariaLabel="infinity-spin-loading"
            />
            <p className='text-white text-2xl'>Loading...</p>
        </div>
    )
}

export default Loader