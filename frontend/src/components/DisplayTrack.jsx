import React, { useEffect } from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({ currentTrack, audioRef, setDuration, progressBarRef }) => {
    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };
    useEffect(()=>{
        audioRef.current.play();
        console.log("Displaytrack USEEFFECT");
        
    }, [currentTrack])
    useEffect(()=>{
        console.log("Current Track", currentTrack);
    }, [])
    return (
        <div>
            <audio
                src={currentTrack}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
            />
            <div className="audio-info flex gap-20">
                <div className=" bg-gray-900">
                    {currentTrack?.thumbnail? (
                        <img src={currentTrack?.thumbnail} alt="audio avatar" className="object-cover w-full h-full" />
                    ) : (
                        <div className="icon-wrapper flex justify-center items-center w-20 h-20 bg-gray-600 rounded-full">
                            <span className="audio-icon text-gray-400 text-2xl">
                                <BsMusicNoteBeamed />
                            </span>
                        </div>
                    )}
                </div>
                <div className="text">
                    <p className="title text-white font-light text-2xl mb-0 py-2 bg-black bg-opacity-75">{currentTrack?.title}</p>
                    <p className="text-gray-600">{currentTrack?.author}</p>
                </div>
            </div>
        </div>
    );
};

export default DisplayTrack;
