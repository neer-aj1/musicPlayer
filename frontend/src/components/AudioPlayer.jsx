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
    const currTrackInd = useSelector(state => state.song?.currentSong);
    const [trackInd, setTrackInd] = useState(useSelector(state => state.song?.currentSong));
    // console.log("Trackind", trackInd);
    const [currentTrack, setCurrentTrack] = useState();
    const len = useSelector(state => state.song?.allSongs?.length);
    let songId = useSelector(state => state.song?.allSongs[trackInd]);

    useEffect(() => {
        setTrackInd(currTrackInd);
    }, [currTrackInd]);

    const nextSong = async () => {
        await audioRef.current.pause();
        if (currentTrack + 1 >= len) {
            setTrackInd(0);
        }
        else {
            setTrackInd(prev => prev + 1);
        }
        dispatch(setCurrentSong(trackInd));
        songId = useSelector(state => state.song.allSongs[trackInd])
    }

    useEffect(() => {
        const getSong = async () => {
            try {
                const url = `https://spotify81.p.rapidapi.com/tracks?ids=${songId}`
                console.log(songId);
                console.log("SONG URL", url);
                const data = await fetchData(url, options);
                console.log("REAL SONG URL", data.tracks[0].preview_url);
                setCurrentTrack(data.tracks[0].preview_url)
            } catch (error) {
                console.log("Error in fetching song", error);
            }
        }
        getSong();
        console.log("AUDIOPLAYER USEEFFECT");
    }, [])
    useEffect(() => {
        const getSong = async () => {
            try {
                const url = `https://spotify81.p.rapidapi.com/tracks?ids=${songId}`
                console.log("SONGID", songId);
                console.log("SONG URL", url);
                const data = await fetchData(url, options);
                console.log("REAL SONG URL", data);
                setCurrentTrack(data.tracks[0].preview_url)
            } catch (error) {
                console.log("Error in fetching song", error);
            }
        }
        getSong();
        console.log("AUDIOPLAYER USEEFFECT");
    }, [trackInd])

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();

    return (
        <div className="audio-player bg-gray-300 rounded-lg">
            <div className="inner w-full flex justify-evenly px-10 py-2">
                <div className='flex-2'>
                    <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
                </div>
                <div className='flex-1'>
                    <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress, nextSong }} />
                    <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
