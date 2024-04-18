import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentSong: 0,
    allSongs: []
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
    }
});

export const { addSongs, setCurrentSong } = songsSlice.actions;

export default songsSlice.reducer;