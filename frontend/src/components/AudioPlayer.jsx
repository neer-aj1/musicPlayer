import React, { useEffect } from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useRef, useState } from 'react';
import { fetchData, options } from '../utils/fetchData';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong, setCurrSongImg } from '../redux/slices/songsSlice';
import { useNavigate } from 'react-router-dom';

const AudioPlayer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const currTrackInd = useSelector(state => state.song?.currentSong);
    const [trackInd, setTrackInd] = useState(useSelector(state => state.song?.currentSong));
    // console.log("Trackind", trackInd);
    const [currentTrack, setCurrentTrack] = useState();
    const len = useSelector(state => state.song?.allSongs?.length);
    console.log(len);
    let songId = useSelector(state => state.song?.allSongs[trackInd]);

    useEffect(() => {
        setTrackInd(currTrackInd);
    }, [currTrackInd]);

    const nextSong = async () => {
        if (user.currentUser) {
            await audioRef.current.pause();
            if (trackInd + 1 >= len) {
                setTrackInd(0);
            }
            else {
                setTrackInd(prev => prev + 1);
            }
            dispatch(setCurrentSong(trackInd));
            songId = useSelector(state => state.song.allSongs[trackInd])
        }
        else {
            navigate("/sign-in");
        }
    }
    const prevSong = async () => {
        if (user.currentUser) {
            await audioRef.current.pause();
            if ((trackInd - 1) >= 0) {
                setTrackInd(prev => prev - 1);
            }
            else {
                setTrackInd(len - 1);
            }
            dispatch(setCurrentSong(trackInd));
            songId = useSelector(state => state.song.allSongs[trackInd])
        }
        else {
            navigate("/sign-in");
        }
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
                dispatch(setCurrSongImg(data.tracks[0].album.images[1].url));
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
                const url = `https://spotify81.p.rapidapi.com/tracks?ids=${songId}`;
                const data = await fetchData(url, options);
                setCurrentTrack(data.tracks[0].preview_url)
            } catch (error) {
                console.log("Error in fetching song", error);
            }
        }
        getSong();
        console.log("AUDIOPLAYER USEEFFECT");
    }, [trackInd, songId])

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();

    return (
        <div className="audio-player bg-opacity-70 bg-white rounded-lg">
            <div className="inner w-full flex justify-evenly px-10 py-2">
                <div className='flex-2'>
                    <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
                </div>
                <div className='flex-1 flex flex-col gap-7'>
                    <div className='w-full flex justify-center'>
                        <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress, nextSong, prevSong }} />
                    </div>
                    <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;
