import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    currentSong: null,
    allSongs: []
}

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        addSongs: (state, action) => {
            state.songs.allSongs = [...action.payload];
        },
        setCurrentSong: (state, action) => {
            state.songs.currentSong = action.payload;
        },
    }
});

export const { addSongs, setCurrentSong } = songsSlice.actions;

export default songsSlice.reducer;