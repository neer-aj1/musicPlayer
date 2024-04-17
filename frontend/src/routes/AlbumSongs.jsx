import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData, options } from '../utils/fetchData';
import SongStrip from '../components/SongStrip';
import Loader from '../components/Loader';
import { addSongs } from '../redux/slices/songsSlice'
import { useDispatch } from 'react-redux'

const AlbumSongs = () => {
    let { albumid } = useParams();
    const dispatch = useDispatch();
    const [albumData, setAlbumData] = useState(null);
    const [loading, setLoading] = useState(false);
    const url = `https://spotify81.p.rapidapi.com/albums?ids=${albumid}`;

    useEffect(() => {
        setLoading(true);
        const getAlbumDetails = async () => {
            try {
                const response = await fetchData(url, options);
                setAlbumData(response.albums[0]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching album details:', error);
                setLoading(false);
            }
        }
        getAlbumDetails();
    }, [albumid]);

    useEffect(() => {
        const setSongs = async () => {
            try {
                let songs = [];
                await albumData?.tracks?.items.map((track) => (
                    songs = [...songs, track.id]
                ))
                dispatch(addSongs(songs));
            } catch (error) {
                console.log("Error Occured in setSongs", error);
            }
        }
        setSongs();
    }, [albumid, albumData])

    return (
        loading ? <Loader /> :
            albumData && (
                <div className='h-screen p-10 flex flex-col gap-10'>
                    <div className='flex gap-10'>
                        <img
                            className="w-96 rounded-xl" src={albumData.images[0].url} alt={albumData.name}
                        />
                        <div className='flex flex-col justify-end gap-5 text-white '>
                            <p className='font-bold text-5xl'>{albumData.name}</p>
                            <p>{albumData.release_date}</p>
                        </div>
                    </div>
                    <div className='p-4 rounded-xl border flex gap-4 flex-col overflow-y-auto'>
                        {albumData.tracks.items.map((track, index) => (
                            <SongStrip key={track.id} number={track.track_number} id={track.id} name={track.name} />
                        ))}
                    </div>
                </div>
            )
    );
}

export default AlbumSongs;
