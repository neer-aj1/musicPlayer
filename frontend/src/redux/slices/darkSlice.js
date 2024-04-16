import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    darkModeState: false
}

const darkSlice = createSlice({
    name: 'dark',
    initialState,
    reducers: {
        toggleDarkMode: (state, action) => {
            state.darkModeState = !state.darkModeState
        }
    }
});

export const {toggleDarkMode} = darkSlice.actions;

export default darkSlice.reducer;