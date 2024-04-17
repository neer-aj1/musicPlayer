import React, { useState } from 'react'
import Card from '../components/Card'
import { fetchData, options } from '../utils/fetchData';

export const Home = () => {
    const [albums, setAlbums] = useState(null);
    const [loading, setLoading] = useState(false);
    const getAlbums = async () => {
        setLoading(true);
        const url = 'https://spotify81.p.rapidapi.com/search?q=arijit&type=multi&offset=0&limit=20&numberOfTopResults=5';
        const data = await fetchData(url, options);
        setAlbums(data.albums);
        setLoading(false);
    }
    return (
        <div>
            {loading ? (<p className='text-white'>Loading</p>) :
                (
                    <div className='w-full flex flex-col justify-center items-center'>
                        <h1 className='text-left w-full text-white text-4xl font-bold'>ALBUMS</h1>
                        <div className='p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20'>
                            {albums && albums.items.map((album, index) => (
                                <Card key={index} coverArt={album?.data?.coverArt?.sources[0].url} name={album?.data?.name} year={album?.data?.date?.year} uri={album.data.uri}/>
                            ))}
                        </div>
                    </div>)
            }
            <button className='text-white' onClick={getAlbums}>GETSONGS</button>
        </div>
    )
}
