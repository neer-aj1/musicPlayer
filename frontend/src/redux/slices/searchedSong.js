import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    currentSong: ""
}


const searchSongSlice = createSlice({
    name: 'searched',
    initialState,
    reducers: {
        updateSearchedSong: (state, action) => {
            state.currentSong = action.payload
        }
    }
});

export const { updateSearchedSong } = searchSongSlice.actions

export default searchSongSlice.reducer;