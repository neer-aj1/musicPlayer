import React from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import { useRef, useState } from 'react';
import { tracks } from './data/tracks';

const AudioPlayer = () => {
    // const [currentTrack, setCurrentTrack] = useState(tracks[0]);
    const currentTrack = "https://p.scdn.co/mp3-preview/40821a698364f0bf84b15bcc71a40ef813fff0e1?cid=d8a5ed958d274c2e8ee717e6a4b0971d";
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef();
    const progressBarRef = useRef();

    return (
        <div className="audio-player bg-gray-300 p-4 rounded-lg">
            <div className="inner max-w-screen-lg mx-auto p-8">
                <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
                <Controls {...{ audioRef, progressBarRef, duration, setTimeProgress }} />
                <ProgressBar
                    {...{ progressBarRef, audioRef, timeProgress, duration }}
                />
            </div>
        </div>
    );
}

export default AudioPlayer;
