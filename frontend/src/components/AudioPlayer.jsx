import React, { useEffect } from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useRef, useState } from 'react';
import { fetchData, options } from '../utils/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../redux/slices/songsSlice';

const AudioPlayer = () => {
    const dispatch = useDispatch();
    const [trackInd, setTrackInd] = useState();
    const [currentTrack, setCurrentTrack] = useState();
    const len = 0;
    const songId = 1;

    const nextSong = async () => {
        if (currentTrack+1 >= len){
            setTrackInd(0);
        }
        else{
            setTrackInd(prev => prev+1);
        }
        dispatch(setCurrentSong(trackInd));
        await audioRef.current.pause();
        await audioRef.current.play();
    }
    useEffect(()=>{
        const getSong = async () => {
            try {
                const url = `https://spotify81.p.rapidapi.com/tracks?ids=${songId}`
                const data = await fetchData(url, options);
                setCurrentTrack(data.tracks[0].preview_url)
            } catch (error) {
                console.log("Error in fetching song", error);
            }
        }
        getSong();
    }, [trackInd])

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();

    return (
        <div className="audio-player bg-[#1ca9c9] p-4 rounded-lg mt-9 bg-opacity-25">
            <div className="inner max-w-screen-lg mx-auto p-8">
                <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
                <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress, nextSong }} />
                <ProgressBar
                    {...{ progressBarRef, audioRef, timeProgress, duration }}
                />
            </div>
        </div>
    );
}

export default AudioPlayer;
