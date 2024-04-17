import React, { useEffect, useCallback, useState, useRef } from 'react';
import {
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from 'react-icons/io5';

const Controls = ({ audioRef, progressBarRef, duration, setTimeProgress }) => {
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
    }, [isPlaying, audioRef]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            playAnimationRef.current = requestAnimationFrame(repeat);
        } else {
            audioRef.current.pause();
            cancelAnimationFrame(playAnimationRef.current);
        }
    }, [isPlaying, audioRef, repeat]);

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume, audioRef]);

    return (
        <div className="controls-wrapper">
            <div className="controls flex">
                <button>
                    <IoPlaySkipBackSharp />
                </button>
                <button>
                    <IoPlayBackSharp />
                </button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <IoPlaySharp /> : <IoPauseSharp />}
                </button>
                <button>
                    <IoPlayForwardSharp />
                </button>
                <button>
                    <IoPlaySkipForwardSharp />
                </button>
            </div>
            <div>
                <input type="range" value={volume} onChange={(e) => (setVolume(e.target.value))} min={0} max={100} />
            </div>
        </div>
    );
};

export default Controls;
