import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSong: 0,
    allSongs: [],
    currentSongImg: null
}

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        addSongs: (state, action) => {
            state.allSongs = [...action.payload];
        },
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        setCurrSongImg: (state, action) => {
            state.currentSongImg = action.payload
        }
    }
});

export const { addSongs, setCurrentSong, setCurrSongImg } = songsSlice.actions;

export default songsSlice.reducer;