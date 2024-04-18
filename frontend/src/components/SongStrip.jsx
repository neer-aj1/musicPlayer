import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSong } from '../redux/slices/songsSlice';

const SongStrip = ({ number, id, name, image }) => {
    const dispatch = useDispatch();
    const allSongs = useSelector(state => state.song?.allSongs);
    const playMusic = () => {
        const index = allSongs?.findIndex(song => song === id);
        dispatch(setCurrentSong(index));
    }
    return (
        <div className='w-full h-16 text-white gap-7 bg-white bg-opacity-15 backdrop-blur-3xl flex justify-start items-center p-2'>
            <div className='h-16 rounded-xl overflow-hidden flex justify-center items-center'>
                {image ? (<img className='rounded-xl w-16 h-full object-contain' src="https://fujifilm-x.com/wp-content/uploads/2021/01/gfx100s_sample_04_thum-1.jpg" alt="" />) : <p className='text-white text-3xl flex justify-center items-center'>{number}</p>}
            </div>
            <div className='w-full flex justify-between items-center px-10'>
                <p>{name}</p>
                <button onClick={playMusic}>Play</button>
            </div>
        </div>
    )
}

export default SongStrip