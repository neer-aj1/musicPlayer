import React, { useState, useMemo, useEffect } from 'react'
import { fetchData, options } from '../utils/fetchData.js';
import Card from '../components/Card'
import SearchResults from '../components/SearchResults.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchedSong } from '../redux/slices/searchedSong.js';


const Search = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState(null);
    const [searchText, setSearchText] = useState(useSelector(state => state.searchedSong?.currentSong));


    useEffect(() => {
        handleSongSearch();
    }, [dispatch, searchText]);

    const handleSongSearch = async () => {
        try {
            setLoading(true)
            const url = `https://spotify81.p.rapidapi.com/search?q=${searchText}&type=albums&offset=0&limit=10&numberOfTopResults=5';`
            const res = await fetchData(url, options);
            setAlbums(res.albums);
            dispatch(updateSearchedSong(searchText))
            setLoading(false);
        } catch (error) {
            console.log("Error while fetching search results", error);
            setLoading(false);
        }
    }
    console.log(searchText);
    return (
        <div className='pt-10 pl-10'>
            <SearchResults onSearch={handleSongSearch} searchResults={albums} searchText={searchText} setSearchText={setSearchText} loading={loading} />
        </div>
    )
}

export default Search