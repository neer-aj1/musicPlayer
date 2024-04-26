import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from 'react-icons/io5';
import { CiVolumeHigh } from "react-icons/ci";

const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress, nextSong, prevSong }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60)
    const playAnimationRef = useRef();
    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        console.log("Controls USEEFFECT");
    }, [isPlaying, audioRef]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            playAnimationRef.current = requestAnimationFrame(repeat);
        } else {
            audioRef.current.pause();
            cancelAnimationFrame(playAnimationRef.current);
        }
        console.log("Controls USEEFFECT");
    }, [isPlaying, audioRef, repeat]);

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
        }
        console.log("Controls USEEFFECT");
    }, [volume, audioRef]);

    return (
        <div className="flex w-full justify-between items-center">
            <div className="controls flex text-3xl">
                <button onClick={prevSong}>
                    <IoPlaySkipBackSharp />
                </button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <IoPlaySharp /> : <IoPauseSharp />}
                </button>
                <button onClick={nextSong}>
                    <IoPlaySkipForwardSharp />
                </button>
            </div>
            <div className='flex gap-4'>
                <CiVolumeHigh className='text-3xl'/>
                <input type="range" value={volume} onChange={(e) => (setVolume(e.target.value))} min={0} max={100} />
            </div>
        </div>
    );
};

export default Controls;
