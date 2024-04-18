import React, { useState } from 'react';
import Card from '../components/Card';

const SearchResults = ({ onSearch, searchResults, searchText, setSearchText }) => {

    const handleSongSearch = async () => {
        onSearch(searchText);
    }

    return (
        <div className='pt-10 pl-10'>
            <div className='border flex w-fit gap-0 rounded overflow-hidden'>
                <input className='h-fit bg-white bg-opacity-15 text-white  p-2 focus:outline-none backdrop-blur-sm' type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <button onClick={handleSongSearch} className='text-white p-2 bg-gray-950 hover:bg-white hover:text-black duration-500'>Search</button>
            </div>
            {searchResults &&
                <div>
                    <div className='p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20'>
                        {searchResults.items.map((album, index) => (
                            <Card key={index} coverArt={album?.data?.coverArt?.sources[0].url} name={album?.data?.name} year={album?.data?.date?.year} uri={album.data.uri} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default SearchResults;
